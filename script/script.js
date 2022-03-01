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
};

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
  //   console.log(phone);
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
            <h5 class="card-title">${name} details</h5>
            <h6 class="card-title text-primary">Features</h6>
            <p class="card-text">
                <strong>Storage:</strong> ${mainFeatures.storage} <br>
                <strong>Display Size:</strong> ${mainFeatures.displaySize} <br>
                <strong>Chipset:</strong> ${mainFeatures.chipset} <br>
                <strong>Memory:</strong> ${mainFeatures.memory} <br>
                <strong>Sensors:</strong> ${mainFeatures.sensors.join(', ')}
            <p class="card-text">
            <h6 class="card-title text-primary">Other Features</h6>
            <p class="card-text">
                <strong>WLAN:</strong> ${others.WLAN}<br>
                <strong>Bluetooth:</strong> ${others.Bluetooth}<br>
                <strong>GPS:</strong> ${others.GPS}<br>
                <strong>NFC:</strong> ${others.NFC}<br>
                <strong>Radio:</strong> ${others.Radio}<br>
                <strong>USB:</strong> ${others.USB}
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
