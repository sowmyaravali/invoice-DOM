
const container = document.querySelector('.container');
const section = document.querySelector('.invoice-section');
const form = document.querySelector('.billdata');
const item = document.querySelector('#item');
const qtn = document.querySelector('#qtn');
const upi = document.querySelector('#upi');
const invoice = document.querySelector('#invoice-num');
const date = document.querySelector('#date');


const name = document.querySelector('#name');
const pnum = document.querySelector('#number');
const addrs = document.querySelector('#adrs');

const i1 = document.querySelector('#i1');
const i2 = document.querySelector('#i2');
const i3 = document.querySelector('#i3');
const i4 = document.querySelector('#i4');
const i5 = document.querySelector('#i5');

const t1 = document.querySelector('#t1');
const t2 = document.querySelector('#t2');
const t3 = document.querySelector('#t3');
const t4 = document.querySelector('#t4');

const d0 = document.querySelector('#d0');
const d1 = document.querySelector('#d1');
const d2 = document.querySelector('#d2');
const d3 = document.querySelector('#d3');
const d4 = document.querySelector('#d4');
const d5 = document.querySelector('#d5');


const download = document.querySelector('.downloadbtn');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const namedata = name.value;
    console.log(namedata);
    const pnumdata = pnum.value;
    console.log(pnumdata);
    const adrsdata = addrs.value;
    console.log(adrsdata);
    const invoicedata = invoice.value;
    console.log(invoicedata);
    const datedata = date.value;
    console.log(datedata);

    if (!i1.hasChildNodes()) {
        const invoice_input = document.createElement('input');
        invoice_input.value = invoicedata;
        invoice_input.setAttribute('readonly', 'readonly');
        i1.appendChild(invoice_input);
    }

    if (!i2.hasChildNodes()) {
        const date_input = document.createElement('input');
        date_input.value = datedata;
        date_input.setAttribute('readonly', 'readonly');
        i2.appendChild(date_input);

    }

    if (!i3.hasChildNodes()) {
        const name_input = document.createElement('input');
        name_input.value = namedata;
        name_input.setAttribute('readonly', 'readonly');
        i3.appendChild(name_input);
    }

    if (!i4.hasChildNodes()) {
        const phone_input = document.createElement('input');
        phone_input.value = pnumdata;
        phone_input.setAttribute('readonly', 'readonly');
        i4.appendChild(phone_input);
    }

    if (!i5.hasChildNodes()) {
        const adrs_input = document.createElement('input');
        adrs_input.value = adrsdata;
        adrs_input.setAttribute('readonly', 'readonly');
        i5.appendChild(adrs_input);
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const itemname = item.value;
    console.log(itemname);
    const qtndata = qtn.value;
    console.log(qtndata);
    const upidata = upi.value;
    console.log(upidata);

//    let n=table.rows.length;
    


    // const serno_input = document.createElement('input');
    // serno_input.value =parseInt(n+1) ;
    // serno_input.setAttribute('readonly', 'readonly');
    // serno_input.style.color = "gray";
    // serno_input.style.backgroundColor = "white";
    // serno_input.style.border = "none";
    // serno_input.style.fontSize = "13px";


    const item_input = document.createElement('input');
    item_input.value = itemname;
    item_input.setAttribute('readonly', 'readonly');
    item_input.style.color = "gray";
    item_input.style.backgroundColor = "white";
    item_input.style.border = "none";
    item_input.style.fontSize = "13px";

    const qtn_input = document.createElement('input');
    qtn_input.value = qtndata;
    qtn_input.setAttribute('readonly', 'readonly');
    qtn_input.style.color = "gray";
    qtn_input.style.backgroundColor = "white";
    qtn_input.style.border = "none";
    qtn_input.style.fontSize = "13px";

    const upi_input = document.createElement('input');
    upi_input.value = upidata;
    upi_input.setAttribute('readonly', 'readonly');
    upi_input.style.color = "gray";
    upi_input.style.backgroundColor = "white";
    upi_input.style.border = "none";
    upi_input.style.fontSize = "13px";

    const gst_input = document.createElement('input');
    gst_input.value = parseInt((parseInt(qtndata) * parseInt(upidata)) * 0.05);
    gst_input.setAttribute('readonly', 'readonly');
    gst_input.style.color = "gray";
    gst_input.style.backgroundColor = "white";
    gst_input.style.border = "none";
    gst_input.style.fontSize = "13px";


    const totalprice = document.createElement('input');
    totalprice.classList.add('totalprice');
    totalprice.value = parseInt(((qtndata) * (upidata)) + parseInt(gst_input.value));
    totalprice.setAttribute('readonly', 'readonly');
    totalprice.style.color = "gray";
    totalprice.style.backgroundColor = "white";
    totalprice.style.border = "none";
    totalprice.style.fontSize = "13px";


    // d0.appendChild(serno_input);
    d1.appendChild(item_input);
    d2.appendChild(qtn_input);
    d3.appendChild(upi_input);
    d4.appendChild(gst_input);
    d5.appendChild(totalprice);

    updateTotalSum();
});

function updateTotalSum() 
{
    const totalprices = document.querySelectorAll('.totalprice');
    const sum = Array.from(totalprices).reduce((total, input) => {
        return total + parseFloat(input.value);
    }, 0);
    t1.textContent = sum;
    console.log(sum);

    const discount = sum * 0.25;
    const discountedTotal = sum - discount;
    const tax = 75;
    const finalAmount = discountedTotal + tax;

    t2.textContent = discountedTotal;
    t3.textContent = tax;
    t4.textContent = finalAmount;
}

download.addEventListener('click', () => {

    // Get the element to be converted to PDF
    var element = section.innerHTML;

    const clone = section.cloneNode(true);

    const inputs = clone.querySelectorAll('input');
    inputs.forEach(input => {
        const para = document.createElement('p');
        para.textContent = input.value;
        input.parentNode.replaceChild(para, inputs);
    });

    // Configure the options for html2pdf
    var opt = {
        margin: 1,
        filename: 'invoice.pdf',
        image: { type: 'jpg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
    };

    // Convert the element to PDF
    html2pdf().from(clone).set(opt).save();
});

