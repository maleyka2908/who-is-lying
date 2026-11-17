// Səhifələri dəyişmək üçün köməkçi funksiya
function showScreen(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Landing Page Başlanğıc Düyməsi ---
    const startBtn = document.getElementById("start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            showScreen('case-selection-page');
        });
    }

    // --- Task #6: Case Selection Logic (Hadisə Seçimi Məntiqi) ---
    const caseCards = document.querySelectorAll(".case-card");
    caseCards.forEach(card => {
        card.addEventListener("click", () => {
            const caseId = card.getAttribute("data-case-id") || "001";
            // Seçilən keysi yaddaşda saxlayırıq
            localStorage.setItem("selectedCaseId", caseId);
            showScreen('profiles-page');
        });
    });

    // --- Task #7: Clue Collection Logic (Dəlil Toplama Məntiqi) ---
    const evidenceItems = document.querySelectorAll(".evidence-item");
    evidenceItems.forEach((item, index) => {
        // Hər dəlilə avtomatik ID veririk (əgər yoxdursa)
        if (!item.getAttribute("data-clue-id")) {
            item.setAttribute("data-clue-id", index + 1);
        }

        item.addEventListener("click", () => {
            const clueId = item.getAttribute("data-clue-id");
            let collectedClues = JSON.parse(localStorage.getItem("collectedClues")) || [];
            
            if (!collectedClues.includes(clueId)) {
                collectedClues.push(clueId);
                localStorage.setItem("collectedClues", JSON.stringify(collectedClues));
                item.classList.add("collected"); // CSS-də dizayn vermək üçün
                alert("🔍 Dəlil uğurla toplandı!");
            } else {
                alert("Bu dəlili artıq əvvəlcə toplamısan.");
            }
        });
    });

    // --- Task #9: Score and Hint System (Xal və İpucu Sistemi) ---
    if (localStorage.getItem("gameScore") === null) {
        localStorage.setItem("gameScore", "100"); // Başlanğıc xal: 100
    }

    // --- Task #8: Final Accusation and Results (İttiham və Nəticə) ---
    const solveBtn = document.querySelector(".solve-btn");
    if (solveBtn) {
        solveBtn.addEventListener("click", () => {
            let currentScore = parseInt(localStorage.getItem("gameScore")) || 100;
            const evidencePage = document.getElementById("evidence-page");
            
            if (evidencePage) {
                // Nəticə ekranını göstəririk
                evidencePage.innerHTML = `
                    <div class="card-container wide">
                        <h2>Oyun Nəticəsi</h2>
                        <p>Təbriklər! Bütün dəlilləri topladın və yalançını uğurla ifşa etdin! 🎉</p>
                        <p><strong>Yekun Xalın: ${currentScore}</strong></p>
                        <button class="primary-btn" onclick="location.reload()">Yenidən Başla</button>
                    </div>
                `;
            }
        });
    }
});
