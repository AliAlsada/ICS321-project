

let table = document.getElementById("usersTable");
let cells = document.getElementsByTagName("th");
let updateButtons = document.getElementsByClassName("update");
let updatePackageButtons = document.getElementsByClassName("updatePackage");
let removePackageButtons = document.getElementsByClassName("removePackage");



for (const button of updateButtons) {
    button.addEventListener("click", () => {
        updateInfo(button.getAttribute("id"))
    })
}

for (const button of updatePackageButtons) {
    button.addEventListener("click", () => {
        updatePackage(button.getAttribute("id"))
    })
}

for (const button of removePackageButtons) {
    button.addEventListener("click", () => {
        deletePackage(button.getAttribute("class").split(" ")[2])
    })
}




for (var i = 0; i < cells.length; i++) {
    cells[i].onclick = function () {
        //console.log('clicked');
        if (this.hasAttribute('data-clicked')) {
            return;
        }
        this.setAttribute('data-clicked', 'yes');
        this.setAttribute('data-text', this.innerHTML);

        var input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.value = this.innerHTML;

        input.style.border = "0px";
        input.style.fontFamily = "inherit";
        input.style.fontSize = "inherit";
        input.style.backgroundColor = "white";

        input.onblur = function () {
            var th = input.parentElement;
            var orig_text = input.parentElement.getAttribute('data-text');
            var current_text = this.value;

            if (orig_text != current_text) {
                //there are changes; save to geojson
                th.removeAttribute('data-clicked');
                th.removeAttribute('data-text');
                th.innerHTML = current_text;
                th.style.cssText = 'padding: 5px'
                console.log(orig_text + ' is changed to ' + current_text);
            } else {
                th.removeAttribute('data-clicked');
                th.removeAttribute('data-text');
                th.innerHTML = orig_text;
                td.style.cssText = 'padding: 5px'
                console.log('no changes');
            }
        }
        input.onkeypress = function () {
            if (event.keycode == 13) {
                this.blur();
            }
        }
        this.innerHTML = '';
        this.style.cssText = 'padding: 0px 0px';
        this.append(input);
        this.firstElementChild.select();
    }
}



const updateInfo = async (user_id) => {
    let data = []
    const row = document.getElementById(`${user_id}/`).cells;
    
    for (const c of row) {
        if (c.tagName === "TH")
            data.push(c.innerHTML.trim())
    }

    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await fetch(`/index/updates`, option)
    showUpdates(user_id);
}

const showUpdates = async (customer_id) => {


    fetch(`/index/updates/${customer_id}`).then(res => res.json()).then(res => {
        const x = document.getElementsByClassName(customer_id);
        

        x[1].innerHTML = res[0].email;
        x[2].innerHTML = res[0].Fname;
        x[3].innerHTML = res[0].Lname;
        x[4].innerHTML = res[0].phone;
        x[5].innerHTML = res[0].country;
        x[6].innerHTML = res[0].city;

    })
}


// --------------------------------------------------------------------------------------------------------------
const updatePackage = async (package_id) => {

    let data = []

    const row = document.getElementById(`${package_id}/`).cells;


    for (const c of row) {
        if (c.tagName === "TH")
            data.push(c.innerHTML.trim())
    } 

    console.log(data)


    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await fetch(`/index/updates/package/"${package_id}"`, option)
    // showPackageUpdates(package_id);
}

const showPackageUpdates = async (package_id) => {


    fetch(`/index/updates/package/"${package_id}"`).then(res => res.json()).then(res => {
        const x = document.getElementsByClassName(package_id);
        // console.log(res[0].email)

        // x[1].innerHTML = res[0].email;
        // x[2].innerHTML = res[0].Fname;
        // x[3].innerHTML = res[0].Lname;
        // x[4].innerHTML = res[0].phone;
        // x[5].innerHTML = res[0].country;
        // x[6].innerHTML = res[0].city;

    })
}


const deletePackage = async (package_id) => {
    let data = []

    const row = document.getElementById(`${package_id}/`).cells;


    for (const c of row) {
        if (c.tagName === "TH")
            data.push(c.innerHTML.trim())
    } 

    console.log(data)


    const option = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    await fetch(`/index/updates/package/"${package_id}"/delete`, option)
    // showPackageUpdates(package_id);
}

const showDeleteUpdates = async (package_id) => {
    await fetch(`/index/updates/package/"${package_id}"/delete`)
}



