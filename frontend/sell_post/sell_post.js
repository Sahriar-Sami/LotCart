// Function to determine seller name
function getSellerName() {
    return "Global_Trade_Co"; 
}

// Main Form Submission Logic
document.getElementById('lotCreationForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // 1. Image Conversion
    const imageFile = document.getElementById('mainImageInput').files[0];
    let imageBinaryArray = null;
    if (imageFile) {
        const buffer = await imageFile.arrayBuffer();
        imageBinaryArray = Array.from(new Uint8Array(buffer));
    }

    try {
        // 2. Step One: Create the Virtual Account on the Server
        // We send the limit and admin info first.
        const vaResponse = await fetch('/api/create-virtual-account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                adminaccount: 288, 
                limit_amount: parseFloat(document.getElementById('lotPrice').value) || 0
            })
        });

        const vaResult = await vaResponse.json();
        
        // This is the CRITICAL part: 
        // We grab the exact ID the database just generated.
        const actualDbVaid = vaResult.vaid; 

        if (!actualDbVaid) throw new Error("Database failed to return a valid vaid.");

        // 3. Step Two: Create the Seller Post using the REAL vaid
        const postData = {
            number_of_product: parseInt(document.getElementById('productQuantity').value) || 0,
            lot_price: parseFloat(document.getElementById('lotPrice').value) || 0,
            estimated_date: document.getElementById('estimatedDate').value,
            destination_country: document.getElementById('targetCountry').value,
            name: document.getElementById('description').value,
            verified_status: 'no',
            sellername: getSellerName(),
            status: 'pending',
            assignedworkerid: 288,
            vaID: actualDbVaid, // Using the ID returned from the DB
            img: imageBinaryArray,
            orderd: 0
        };

        const postResponse = await fetch('/api/create-seller-post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });

        if (postResponse.ok) {
            alert(`Success! Lot created with Database VAID: ${actualDbVaid}`);
        }

    } catch (error) {
        console.error("Submission failed:", error);
        alert("Error: Could not link the Virtual Account to the Post.");
    }
});

// Helper for image previewing
function handlePreview(inputElement, previewId) {
    if (!inputElement) return;
    inputElement.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById(previewId).innerHTML = 
                    `<img src="${e.target.result}" style="width:100%; height:100%; object-fit:cover;">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

handlePreview(document.getElementById('mainImageInput'), 'mainImagePreview');