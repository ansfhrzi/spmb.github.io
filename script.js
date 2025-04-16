function openSidebar() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeSidebar() {
    document.getElementById("sidebar").style.width = "0";
}

function toggleAnswer(clickedElement) {
    // Kode sebelumnya tetap sama...

    const currentAnswer = clickedElement.nextElementSibling;
    clickedElement.classList.toggle('active');
    currentAnswer.classList.toggle('show');

    // Hapus tombol yang ada
    currentAnswer.querySelectorAll('.copy-wa-btn, .copy-tg-btn').forEach(btn => btn.remove());

    

    if (currentAnswer.classList.contains('show')) {
        // Hapus tombol yang ada
        const existingButtonContainer = currentAnswer.querySelector('.answer-buttons');
        if (existingButtonContainer) existingButtonContainer.remove();

        // Buat container tombol
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'answer-buttons';

        // Tombol WhatsApp
        const waBtn = document.createElement('button');
        waBtn.className = 'copy-wa-btn';
        waBtn.innerHTML = 'Salin ke WA';
        waBtn.onclick = (e) => {
            e.stopPropagation();
            copyToWhatsApp(currentAnswer);
        };

        // Tombol Telegram
        const tgBtn = document.createElement('button');
        tgBtn.className = 'copy-tg-btn';
        tgBtn.innerHTML = 'Salin ke TG';
        tgBtn.onclick = (e) => {
            e.stopPropagation();
            copyToTelegram(currentAnswer);
        };

        buttonContainer.append(waBtn, tgBtn);
        currentAnswer.appendChild(buttonContainer);
    }
}

// Fungsi untuk Telegram
function copyToTelegram(answerElement) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = answerElement.innerHTML;
    
    // Hapus tombol dari clone
    tempDiv.querySelectorAll('button').forEach(btn => btn.remove());
    
    // Konversi format untuk Telegram
    const elementsToConvert = {
        'strong': (el) => `**${el.innerText}**`,
        'a': (el) => `[${el.innerText}](${el.href})`,
        'li': (el) => `- ${el.innerText.replace(/•/g, '').trim()}`
    };

    Object.entries(elementsToConvert).forEach(([tagName, converter]) => {
        tempDiv.querySelectorAll(tagName).forEach(el => {
            const replacement = document.createTextNode(converter(el));
            el.replaceWith(replacement);
        });
    });

    const text = tempDiv.innerText
        .replace(/\n{3,}/g, '\n\n')  // Batasi line breaks
        .trim();

    const finalText = `${text}\n\n_Sumber: SPMB SMKN Prigen_`;

    navigator.clipboard.writeText(finalText).then(() => {
        alert('Teks berhasil disalin! Tempel di Telegram (Ctrl+V)');
    });
}

function copyToWhatsApp(answerElement) {
    // Clone element untuk memproses konten
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = answerElement.innerHTML;
    
    // Hapus tombol copy dari clone
    const copyBtn = tempDiv.querySelector('.copy-wa-btn');
    if(copyBtn) copyBtn.remove();
    
    // Konversi formatting khusus
    const elementsToConvert = {
        'strong': (el) => `*${el.innerText}*`,
        'a': (el) => `${el.innerText} (${el.href})`,
        'li': (el) => `• ${el.innerText.replace(/•/g, '').trim()}` 
    };
    
    Object.entries(elementsToConvert).forEach(([tagName, converter]) => {
        tempDiv.querySelectorAll(tagName).forEach(el => {
            const replacement = document.createTextNode(converter(el));
            el.replaceWith(replacement);
        });
    });
    
    // Format akhir untuk WhatsApp
    const text = tempDiv.innerText
        .replace(/^\s*[\r\n]/gm, '') // Hapus baris kosong
        .replace(/\n+/g, '\n')       // Hapus newline berlebih
        .replace(/(\n)/g, '\n• ')    // Format list
        .replace(/• \n/g, '\n')      // Perbaiki list terakhir
        .trim();
    
    const finalText = `${text}\n\n_Copied from SPMB SMKN Prigen FAQ_`;
    
    // Salin ke clipboard
    navigator.clipboard.writeText(finalText).then(() => {
        alert('Teks berhasil disalin! Tempel di WhatsApp (Ctrl+V)');
    }).catch(err => {
        console.error('Gagal menyalin:', err);
    });
}
