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
  for (const element of document.querySelectorAll("table[data-sum-column]")) {
    const sumColumn = element.dataset.sumColumn
    const frequencyColumn = element.dataset.frequencyColumn

    let sum = 0;
    for (const tr of element.querySelectorAll("tr")) {
      const td = tr.querySelector(`:nth-child(${sumColumn})`)
      let text = td.textContent
        .replace(",-", ",00") // replace ,- with ,00
        .replace(",", ".") // only use periods
        .replace(/[^0-9\.]/g, "") // remove anything but numbers and periods
        .replace(/[.](?=.*[.])/g, "") // remove all but last period
      let float = parseFloat(text)

      if (frequencyColumn) {
        const frequency = tr.querySelector(`:nth-child(${frequencyColumn})`)
        switch (frequency.textContent) {
          case "/år":
            float /= 12
            break;
          case "/kvartal":
            float /= 3
            break;
          default:
            console.log(frequency.textContent)
        }
      }

      sum += float
    }
    element.querySelector("tbody").insertAdjacentHTML('beforeend', `<tr><th>Total /md.</th><td>${sum.toLocaleString()}</td></td>`)
  }
})