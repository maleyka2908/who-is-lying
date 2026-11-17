// Case seçimi səhifəsində işləyəcək kod
document.addEventListener("DOMContentLoaded", () => {
    // Bütün case seçmə düymələrini/kartlarını seçirik
    const caseCards = document.querySelectorAll(".case-card"); // HTML-dəki sinif adınıza uyğun dəyişə bilərsiniz

    caseCards.forEach(card => {
        card.addEventListener("click", (e) => {
            // Hansı case seçildiyini öyrənirik (məsələn: data-case-id="1")
            const caseId = card.getAttribute("data-case-id");
            
            if (caseId) {
                // Seçilən case ID-sini brauzerin yaddaşında (localStorage) saxlayırıq ki, digər səhifə oxuya bilsin
                localStorage.setItem("selectedCaseId", caseId);
                
                // Dəlil və ya şübhəlilər səhifəsinə yönləndiririk
                window.location.href = "evidence.html"; // Fayl adını öz səhifənizə uyğunlaşdırın
            }
        });
    });
});
