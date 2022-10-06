
const baseURL = 'http://localhost:5001/arena-banorte/us-central1'

export async function savePhoneNumber(phoneNumber: string) {
  const response = await fetch(baseURL + '/verifications', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ phoneNumber })
  })
  console.log(await response.text())
}
