const searchPhone = async () => {
  const searchField = document.getElementById('search-input');
  const searchText = searchField.value;
  //   console.log(searchText);
  searchField.value = '';
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

const displayPhones = async (phones) => {
  const searchResult = document.getElementById('search-result');
  searchResult.innerText = '';
  await phones.forEach((phone) => {
    const div = document.createElement('div');
    div.classList.add('col', 'd-flex', 'justify-content-center');
    div.innerHTML = `
      <div class="card" style="width: 18rem">
        <img
          src="https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-12.jpg"
          class="card-img-top"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
          <a
            href="#"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            >See Details</a
          >
        </div>
    </div>
      `;
    searchResult.appendChild(div);
  });
};
