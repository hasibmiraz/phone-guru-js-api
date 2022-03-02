// Custom Function
const toggleView = (id, removeProp, addProp) => {
  const spinner = document.getElementById(id);
  spinner.classList.remove(removeProp);
  spinner.classList.add(addProp);
};

// Search Phone Function
const searchPhone = async () => {
  const searchField = document.getElementById('search-input');
  const searchText = searchField.value;

  toggleView('spinner', 'd-none', 'd-flex');
  document.getElementById('search-result').style.display = 'none';

  searchField.value = '';
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data);
};

// Display Phone Function
const displayPhones = async (phones) => {
  const searchResult = document.getElementById('search-result');
  toggleView('spinner', 'd-none', 'd-flex');
  searchResult.innerText = '';
  if (phones.length > 20) {
    phones = phones.slice(0, 20);
  }

  await phones.forEach(({ brand, phone_name, slug, image }) => {
    const div = document.createElement('div');
    div.classList.add('col', 'd-flex', 'justify-content-center');
    div.innerHTML = `
      <div class="card rounded-3" style="width: 18rem">
        <img
          src="${image}"
          class="card-img-top p-2"
          alt="..."
        />
        <div class="card-body">
          <h5 class="card-title">Name: ${phone_name}</h5>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Brand: ${brand}</li>
        </ul>
        <div class="card-body">
          <a
            onclick="loadPhoneDetail('${slug}')"
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
  toggleView('spinner', 'd-flex', 'd-none');
  document.getElementById('search-result').style.display = 'flex';
};

// Load Phone Detail Function
const loadPhoneDetail = async (phoneSlug) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetail(data.data);
};

const displayPhoneDetail = async ({
  name,
  image,
  releaseDate,
  mainFeatures,
  others,
}) => {
  const phoneDetail = document.getElementById('phone-detail');
  phoneDetail.innerText = '';
  const div = document.createElement('div');
  div.classList.add('modal-content');
  div.innerHTML = `
    <div class="modal-header">
    <h5 class="modal-title" id="staticBackdropLabel">${name}</h5>
    <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
    ></button>
    </div>
    <div class="modal-body">
    <div class="card mb-3" style="max-width: 540px">
        <div class="row g-0">
        <div class="col-md-4">
            <img
            src="${image}"
            class="img-fluid rounded-start"
            alt="..."
            />
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">Details</h5>
            <h6 class="card-title text-primary">Features</h6>
            <p class="card-text">
                <strong>Storage:</strong> ${
                  mainFeatures?.storage || 'Information uvailable'
                } <br>
                <strong>Display Size:</strong> ${
                  mainFeatures?.displaySize || 'Information uvailable'
                } <br>
                <strong>Chipset:</strong> ${
                  mainFeatures?.chipset || 'Information uvailable'
                } <br>
                <strong>Memory:</strong> ${
                  mainFeatures?.memory || 'Information uvailable'
                } <br>
                <strong>Sensors:</strong> ${
                  mainFeatures?.sensors.join(', ') || 'Information uvailable'
                }
            <p class="card-text">
            <h6 class="card-title text-primary">Other Features</h6>
            <p class="card-text">
                <strong>WLAN:</strong> ${
                  others?.WLAN || 'Information uvailable'
                }<br>
                <strong>Bluetooth:</strong> ${
                  others?.Bluetooth || 'Information uvailable'
                }<br>
                <strong>GPS:</strong> ${
                  others?.GPS || 'Information uvailable'
                }<br>
                <strong>NFC:</strong> ${
                  others?.NFC || 'Information uvailable'
                }<br>
                <strong>Radio:</strong> ${
                  others?.Radio || 'Information uvailable'
                }<br>
                <strong>USB:</strong> ${others?.USB || 'Information uvailable'}
            <p class="card-text">
                <small class="text-muted">${
                  releaseDate || 'Release Date: Unknown'
                }</small>
            </p>
            </div>
        </div>
        </div>
    </div>
    </div>
    <div class="modal-footer">
    <button
        type="button"
        class="btn btn-danger"
        data-bs-dismiss="modal"
    >
        Close
    </button>
    </div>
  `;
  phoneDetail.appendChild(div);
};
