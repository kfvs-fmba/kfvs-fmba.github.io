addEventListener("DOMContentLoaded", () => {
  // Copy to clipboard buttons
  for (const element of document.querySelectorAll("button[data-copy]")) {
    element.hidden = false
    element.addEventListener("click", () => {
      navigator.clipboard.writeText(element.dataset.copy)
      const tmp = element.innerHTML
      element.textContent = "Kopieret!"
      setTimeout(() => { element.innerHTML = tmp }, 1000)
    })
  }

  // Sum columns
  for (const element of document.querySelectorAll("table[data-sum]")) {
    let sum = 0;
    for (const td of element.querySelectorAll("td")) {
      const float = td.textContent
        .replace(",", ".") // only use periods
        .replace(/[^0-9\.]/g, "") // remove anything but numbers and periods
        .replace(/[.](?=.*[.])/g, "") // remove all but last period
      sum += parseFloat(float)
    }
    element.insertAdjacentHTML('beforeend',`<tr><th>Total</th><td>${sum.toLocaleString()}</td></td>`)
  }
})