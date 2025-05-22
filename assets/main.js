addEventListener("DOMContentLoaded", () => {
  // Table of contents highlighting
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      const element = document.querySelector(`a[href="#${target.id}"]`)
      element.classList.toggle('active', isIntersecting)
    }
  })
  for (const element of document.querySelectorAll('#faq article[id]')) {
    observer.observe(element)
  }

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
  for (const table of document.querySelectorAll("table[data-sum-column]")) {
    const sumColumnIndex = table.dataset.sumColumn
    const frequencyColumnIndex = table.dataset.frequencyColumn

    let sum = 0
    for (const row of table.querySelectorAll("tr")) {
      const cell = row.querySelector(`:nth-child(${sumColumnIndex})`).textContent
      let number = parseNumber(cell)

      if (frequencyColumnIndex) {
        const frequency = row.querySelector(`:nth-child(${frequencyColumnIndex})`).textContent
        number = adjustByFrequency(number, frequency)
      }

      sum += number
    }
    table.querySelector("tbody").insertAdjacentHTML(
      'beforeend',
      `<tr><th>Total /md.</th><td>${formatNumber(sum)}</td></td>`
    )
  }
})

const LOCALE = "da-DK"

function adjustByFrequency(float, frequency) {
  switch (frequency) {
    case "/år":
      return float /= 12
    case "/kvartal":
      return float /= 3
    default:
      return float
  }
}

function parseNumber(text) {
  const replaced = text
    .replace(",-", ",00") // replace ,- with ,00
    .replace(",", ".") // only use periods
    .replace(/[^0-9\.]/g, "") // remove anything but numbers and periods
    .replace(/[.](?=.*[.])/g, "") // remove all but last period
  return parseFloat(replaced)
}

function formatNumber(float) {
  return float.toLocaleString(LOCALE, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}