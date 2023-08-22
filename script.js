document.addEventListener("DOMContentLoaded", function () {
    const eczaneForm = document.getElementById("eczaneForm");
    const eczaneListesi = document.getElementById("eczaneListesi");

    eczaneForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const sehir = document.getElementById("sehir").value;
        const ilce = document.getElementById("ilce").value;

        if (!sehir || !ilce) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        fetch(`https://api.collectapi.com/health/dutyPharmacy?ilce=${encodeURIComponent(ilce)}&il=${encodeURIComponent(sehir)}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "authorization": "apikey 7xuOiLiKEvU8XUJPOgobfJ:2S3z3Ppp8RzNR8qLCJ6lxQ"
            }
        })
        .then(response => response.json())
        .then(data => {
            eczaneListesi.innerHTML = "";
            data.result.forEach(eczane => {
                const eczaneDiv = document.createElement("div");
                eczaneDiv.classList.add("eczane");
                eczaneDiv.innerHTML = `
                    <h3>${eczane.name}</h3>
                    <p>${eczane.address}</p>
                `;
                eczaneListesi.appendChild(eczaneDiv);
            });
        })
        .catch(error => {
            console.error("Hata:", error);
        });
    });
});
