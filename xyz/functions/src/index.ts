import * as functions from "firebase-functions"
import * as admin from "firebase-admin"
import fetch from "node-fetch"

admin.initializeApp()
const db = admin.firestore()

// This function runs every 15 minutes
export const updateMandiRates = functions.pubsub.schedule("every 15 minutes").onRun(async () => {
  try {
    // Replace with actual API endpoint for mandi rates
    const response = await fetch(
      "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?api-key=YOUR_API_KEY&format=json&limit=1000",
    )
    const data = await response.json()

    if (!data.records) {
      console.error("No records found in API response")
      return null
    }

    const batch = db.batch()
    const timestamp = admin.firestore.FieldValue.serverTimestamp()

    // Process each record and add to batch
    data.records.forEach((record: any) => {
      const docRef = db.collection("mandiRates").doc()
      batch.set(docRef, {
        commodity: record.commodity,
        market: record.market,
        state: record.state,
        district: record.district,
        minPrice: Number.parseFloat(record.min_price) || 0,
        maxPrice: Number.parseFloat(record.max_price) || 0,
        modalPrice: Number.parseFloat(record.modal_price) || 0,
        updatedAt: timestamp,
      })
    })

    // Also update the latest document for quick access
    const latestRef = db.collection("mandiRates").doc("latest")
    batch.set(latestRef, {
      records: data.records,
      updatedAt: timestamp,
    })

    await batch.commit()
    console.log(`Updated ${data.records.length} mandi rates`)
    return null
  } catch (error) {
    console.error("Error updating mandi rates:", error)
    return null
  }
})
