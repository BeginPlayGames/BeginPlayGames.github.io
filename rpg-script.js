document.addEventListener('DOMContentLoaded', () => {
    let state = { hp: 100, gold: 30, sanity: 100, isDead: false };

    const elHp = document.getElementById('stat-hp');
    const elGold = document.getElementById('stat-gold');
    const elSanity = document.getElementById('stat-sanity');
    const elStatus = document.getElementById('status-effect');
    const logContainer = document.getElementById('log-container');
    const avatar = document.getElementById('hero-avatar');

    const btnRob = document.getElementById('btn-rob');
    const btnWork = document.getElementById('btn-work');
    const btnDuelRat = document.getElementById('btn-duel-rat');
    const btnFeast = document.getElementById('btn-feast');
    const btnTavern = document.getElementById('btn-tavern');
    const btnDoctor = document.getElementById('btn-doctor');
    const btnPray = document.getElementById('btn-pray');
    
    const deathModal = document.getElementById('death-modal');
    const btnRestart = document.getElementById('btn-restart');
    const deathReason = document.getElementById('death-reason');

    function addLog(text, type = 'normal') {
        const p = document.createElement('p');
        p.className = `log-entry log-${type}`;
        p.innerHTML = text;
        logContainer.appendChild(p);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    function updateUI() {
        elHp.innerText = `${state.hp}/100`;
        elGold.innerText = state.gold;
        elSanity.innerText = `${state.sanity}%`;

        if (state.sanity < 30) {
            elSanity.style.color = 'var(--text-danger)';
            avatar.style.filter = 'sepia(1) hue-rotate(90deg) contrast(2) invert(0.8)';
            if (Math.random() < 0.3) document.body.classList.add('cringe-shake');
            setTimeout(() => document.body.classList.remove('cringe-shake'), 500);
        } else if (state.sanity < 70) {
            elSanity.style.color = '#ffaa00';
            avatar.style.filter = 'sepia(0.8) contrast(1.5)';
        } else {
            elSanity.style.color = 'var(--text-main)';
            avatar.style.filter = 'sepia(0.6) contrast(1.2)';
        }

        if (state.sanity === 100) elStatus.innerText = "Состояние: Подозрительно нормальное";
        else if (state.sanity > 70) elStatus.innerText = "Состояние: Стабильное отчаяние";
        else if (state.sanity > 30) elStatus.innerText = "Состояние: Слышит голоса крестьян";
        else elStatus.innerText = "Состояние: Полнейшая постирония";

        if (state.hp <= 0 && !state.isDead) {
            die();
        }

        if(btnFeast) btnFeast.disabled = state.gold < 10;
        if(btnTavern) btnTavern.disabled = state.gold < 5;
        if(btnDoctor) btnDoctor.disabled = state.gold < 20;
    }

    function die() {
        state.isDead = true;
        deathReason.innerText = `Вы потеряли все здоровье и стали крепостным в Баронстве Тризнов. Ваша кукуха была на уровне ${state.sanity}%.`;
        deathModal.classList.remove('hidden');
    }

    if(btnRestart) {
        btnRestart.addEventListener('click', () => {
            state = { hp: 100, gold: 30, sanity: 100, isDead: false };
            logContainer.innerHTML = '';
            addLog("Вы переродились. Инквизиция Баронства дала вам второй шанс.", 'system');
            deathModal.classList.add('hidden');
            updateUI();
        });
    }

    if(btnRob) {
        btnRob.addEventListener('click', () => {
            if (state.isDead) return;
            const goldGain = Math.floor(Math.random() * 15) + 5;
            state.gold += goldGain;
            state.sanity = Math.max(0, state.sanity - (Math.floor(Math.random() * 10) + 5));

            let log = `Вы успешно ограбили крестьянина на <b>${goldGain} Грошей</b>. `;
            let type = 'gold';

            if (Math.random() < 0.3) {
                const dmg = Math.floor(Math.random() * 20) + 10;
                state.hp -= dmg;
                log += `Однако крестьянин оказался агентом Инквизиции и ударил вас граблями! <span style="color:red">-${dmg} HP</span>.`;
                type = 'danger';
            } else {
                log += "Его слезы были горькими.";
            }

            addLog(log, type);
            checkCringeEvent();
            updateUI();
        });
    }

    if(btnWork) {
        btnWork.addEventListener('click', () => {
            if (state.isDead) return;
            const goldGain = Math.floor(Math.random() * 5) + 3;
            state.gold += goldGain;
            state.hp -= 5;
            state.sanity = Math.max(0, state.sanity - 2);

            addLog(`Вы честно отработали в поле Барона. Спина болит (-5 HP), но вы получили <b>${goldGain} Грошей</b>.`, 'normal');
            checkCringeEvent();
            updateUI();
        });
    }

    if(btnDuelRat) {
        btnDuelRat.addEventListener('click', () => {
            if (state.isDead) return;
            const rand = Math.random();
            if (rand < 0.4) {
                const goldGain = 20;
                state.gold += goldGain;
                state.sanity = Math.min(100, state.sanity + 5);
                addLog(`Вы благородно победили Огромную Чумную Крысу в честном поединке на шпагах! У нее в карманах было <b>${goldGain} Грошей</b>.`, 'gold');
            } else if (rand < 0.8) {
                const dmg = 25;
                state.hp -= dmg;
                state.sanity = Math.max(0, state.sanity - 15);
                addLog(`Крыса применила грязный прием и укусила вас за лодыжку! Позор! <span style="color:red">-${dmg} HP</span>, -15 Кукухи.`, 'danger');
            } else {
                state.sanity = Math.max(0, state.sanity - 20);
                addLog(`Вы с крысой посмотрели друг другу в глаза, поняли всю тщетность бытия и разошлись. -20 Кукухи от экзистенциального кризиса.`, 'cringe');
            }
            checkCringeEvent();
            updateUI();
        });
    }

    if(btnFeast) {
        btnFeast.addEventListener('click', () => {
            if (state.isDead || state.gold < 10) return;
            state.gold -= 10;
            const heal = Math.floor(Math.random() * 30) + 20;
            state.hp = Math.min(100, state.hp + heal);
            state.sanity = Math.min(100, state.sanity + 10);
            let log = `Вы отправились на Тризну. Потрачено <b>10 Грошей</b>. Съели блинов и восстановили <span style="color:#4dff88">+${heal} HP</span>.`;
            if (Math.random() < 0.3) log += " Вы случайно съели свечу вместо пирожка. Хрустяще.";
            addLog(log, 'heal');
            checkCringeEvent();
            updateUI();
        });
    }

    if(btnTavern) {
        btnTavern.addEventListener('click', () => {
            if (state.isDead || state.gold < 5) return;
            state.gold -= 5;
            const rand = Math.random();
            if (rand < 0.3) {
                state.sanity = Math.min(100, state.sanity + 20);
                addLog(`В таверне бард пел песню про глупого рыцаря. Вы посмеялись. <span style="color:#4dff88">+20 Кукухи</span>.`, 'heal');
            } else if (rand < 0.6) {
                state.hp -= 10;
                addLog(`В таверне началась драка. В вас прилетел табурет. <span style="color:red">-10 HP</span>.`, 'danger');
            } else if (rand < 0.9) {
                state.gold += 15;
                addLog(`Пьяный дворянин перепутал вас со своим слугой и дал вам на чай <b>15 Грошей</b>.`, 'gold');
            } else {
                state.sanity = Math.max(0, state.sanity - 30);
                addLog(`Хозяин таверны оказался постироничным стендапером. Вы не выдержали его шуток. <span style="color:#cc00ff">-30 Кукухи</span>.`, 'cringe');
            }
            checkCringeEvent();
            updateUI();
        });
    }

    if(btnDoctor) {
        btnDoctor.addEventListener('click', () => {
            if (state.isDead || state.gold < 20) return;
            state.gold -= 20;
            state.hp = 100;
            state.sanity = Math.max(0, state.sanity - 40);
            addLog(`Чумной доктор приложил к вашему лбу пиявок, посыпал солью и ударил палкой. Ваше здоровье полностью восстановлено, но вы теперь боитесь палок. <span style="color:#cc00ff">-40 Кукухи</span>.`, 'heal');
            checkCringeEvent();
            updateUI();
        });
    }

    if(btnPray) {
        btnPray.addEventListener('click', () => {
            if (state.isDead) return;
            const rand = Math.random();
            if (rand < 0.2) {
                state.hp = 100;
                addLog("Колесо услышало вас! Ваши раны мгновенно затянулись. Полное исцеление!", "heal");
            } else if (rand < 0.4) {
                state.gold = Math.floor(state.gold / 2);
                addLog("Колесо требует жертв. Половина ваших Грошей провалилась сквозь текстуры земли.", "danger");
            } else if (rand < 0.6) {
                state.sanity = Math.max(0, state.sanity - 30);
                addLog("Вы заглянули в бездну Колеса. Бездна сказала 'Кринж'. <span style="color:#cc00ff">-30 Кукухи</span>.", "cringe");
            } else if (rand < 0.8) {
                state.gold += 50;
                addLog("С небес упал мешок с надписью 'От Барона Тризнова'. Там <b>50 Грошей</b>!", "gold");
            } else {
                addLog("Вы молились Колесу два часа. Мимо прошел стражник и покрутил пальцем у виска.", "normal");
            }
            checkCringeEvent();
            updateUI();
        });
    }

    function checkCringeEvent() {
        const cringeChance = (100 - state.sanity) / 250;
        if (Math.random() < cringeChance) {
            const events = [
                () => { state.gold += 1; addLog("Галлюцинация: Верблюд с иконы плюнул вам в лицо серебряной монетой. +1 Грош.", "cringe"); },
                () => { state.hp -= 10; addLog("Вас посетило экзистенциальное отчаяние. Вы ударились головой о сруб. -10 HP.", "danger"); },
                () => { addLog("Вы попытались вспомнить, зачем вы здесь. В голове Ошибка 404.", "system"); },
                () => { const stolen = Math.floor(state.gold * 0.2); state.gold -= stolen; addLog(`Сборщик налогов Тризнова отобрал у вас налог на постиронию (${stolen} Грошей).`, "danger"); },
                () => { state.sanity += 20; addLog("Вас ударила молния! На удивление, ваши мозги встали на место. +20 Кукухи.", "heal"); },
                () => { addLog("Вы попытались заговорить с репой на грядке. Репа ответила вам на латыни. Вы сделали вид, что поняли.", "cringe"); },
                () => { state.gold -= 5; addLog("Стража Тризнова оштрафовала вас за 'отсутствие должного уныния на лице'. Штраф 5 Грошей.", "danger"); },
                () => { addLog("Вам кажется, что вы находитесь внутри HTML страницы. Вы ищете кнопку F12, но находите лишь вилы.", "cringe"); },
                () => { state.hp = Math.min(100, state.hp + 5); addLog("Мимо пролетела жареная курица и ударила вас по лицу. Вы откусили кусок. +5 HP.", "heal"); },
                () => { addLog("Где-то вдалеке завыли волки. Вы завыли в ответ. Волки замолчали в неловкости.", "cringe"); },
                () => { state.sanity = Math.max(0, state.sanity - 10); addLog("Вы посмотрели на свои руки и осознали, что вы — всего лишь набор пикселей. -10 Кукухи.", "cringe"); },
                () => { const found = Math.floor(Math.random() * 15) + 1; state.gold += found; addLog(`В луже грязи вы нашли чьи-то золотые зубы. Вы продали их алхимику за ${found} Грошей.`, "gold"); },
                () => { addLog("Барон Тризнов издал новый указ: 'Всем дышать через раз в целях экономии воздуха'.", "system"); },
                () => { state.hp -= 15; addLog("Вы решили, что можете летать. Вы прыгнули с забора и приземлились в навоз. -15 HP и гордости.", "danger"); },
                () => { state.sanity = Math.min(100, state.sanity + 15); addLog("Вы встретили местного деревенского дурачка. На его фоне вы почувствовали себя гением. +15 Кукухи.", "heal"); }
            ];
            const randomEvent = events[Math.floor(Math.random() * events.length)];
            setTimeout(() => {
                if (!state.isDead) { randomEvent(); updateUI(); }
            }, 500); 
        }
    }

    updateUI();
});
