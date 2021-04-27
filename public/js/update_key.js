var button = document.getElementById("submit");

button.addEventListener("click", updateKeys);

function updateKeys() {
    var key1 = document.getElementById("key1");
    var key2 = document.getElementById("key2");

    if (key1.value != key2.value){
        return alert("Key does not match. Retry.");

    }
    if (key1.value.length < 6){
        return alert("Key length should be more than 6. Retry.")
    }

    const temp_key = key1.value;
    
    fetch('http://localhost:5000/instructor_main/updateKey', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ app_key : temp_key})
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        }
    });
}

