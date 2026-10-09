const body = document.body;
const toggle = document.querySelector("[data-menu-toggle]");
const menu = document.querySelector("[data-menu]");
const menuLinks = menu.querySelectorAll("a");

function setMenu(open) {
  body.classList.toggle("menu-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
  menu.setAttribute("aria-hidden", String(!open));
}

toggle.addEventListener("click", () =>
  setMenu(!body.classList.contains("menu-open")),
);
menuLinks.forEach((link) =>
  link.addEventListener("click", () => setMenu(false)),
);
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

const animated = document.querySelectorAll(
  ".reveal, .reveal-image, .hero__title",
);
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);
animated.forEach((el) => observer.observe(el));

let previousY = window.scrollY;
const header = document.querySelector("[data-header]");
window.addEventListener(
  "scroll",
  () => {
    const currentY = window.scrollY;
    if (!body.classList.contains("menu-open")) {
      header.style.transform =
        currentY > previousY && currentY > 160
          ? "translateY(-100%)"
          : "translateY(0)";
    }
    previousY = currentY;
  },
  { passive: true },
);

const statNumbers = document.querySelectorAll(".stat__number[data-count]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

function animateCount(el) {
  const target = Number(el.dataset.count);
  const stat = el.closest(".stat");
  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const duration = 1100;
  const start = performance.now();
  stat?.classList.add("is-counting");

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    el.textContent = Math.round(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  }
  requestAnimationFrame(tick);
}

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.55 },
);

statNumbers.forEach((number) => countObserver.observe(number));

const serviceModal = document.querySelector("[data-service-dialog]");
const serviceModalContent = document.querySelector("[data-service-content]");
const serviceModalButtons = document.querySelectorAll("[data-service-modal]");
const serviceModalClose = document.querySelectorAll("[data-service-close]");

const serviceData = {
  coaching: {
    eyebrow: "Індивідуальний та груповий формат",
    title: "Коучинг",
    lead: "Для тих, хто хоче перейти від сумнівів і відкладання до рішень, внутрішньої опори та конкретних дій.",
    blocks: [
      {
        title: "Що болить",
        items: [
          "Постійне відкладання важливих рішень і дій",
          "Складно знайти баланс між роботою та родиною",
          "Маленький заробіток або відчуття, що стоїте на місці",
          "Страх почати власну справу",
          "Багато часу й сил вкладаєте в роботу, але не бачите бажаного результату",
        ],
      },
      {
        title: "Що не виходить",
        items: [
          "Почати діяти",
          "Впевнено заявляти про себе",
          "Залучати клієнтів через соціальні мережі",
          "Продавати свої послуги без відчуття сорому та нав’язування",
        ],
      },
      {
        title: "Результат",
        items: [
          "Починаєте діяти й менше відкладаєте",
          "Знаходите баланс між родиною та роботою",
          "Збільшуєте заробіток або знаходите нову роботу",
          "Починаєте власну справу",
          "Відчуваєте більше впевненості у собі та своїх рішеннях",
          "Працюєте з негативними життєвими стратегіями та переконаннями",
          "Берете відповідальність за власні рішення без постійного страху помилитися",
        ],
      },
      {
        title: "Вартість",
        items: [
          "1 сесія — 1 800 грн",
          "Пакет з 8 сесій — 12 000 грн",
        ],
      },
    ],
  },

  mentoring: {
    eyebrow: "Індивідуальна робота · для експерток",
    title: "Менторство",
    lead: "Для експерток, які хочуть перейти на новий професійний рівень, структурувати свій досвід, зрозуміти власне позиціонування та впевненіше проявляти свою експертність.",
    blocks: [
      {
        title: "Професійний напрям",
        items: [
          "Структуруємо ваш професійний досвід і сильні сторони",
          "Визначаємо цілі та напрямок подальшого розвитку",
          "Знаходимо точки росту й те, на чому варто сфокусуватися саме зараз",
          "Перетворюємо велику кількість ідей на зрозумілий план",
        ],
      },
      {
        title: "Позиціонування",
        items: [
          "Визначаємо вашу професійну роль та експертну нішу",
          "Формулюємо сильні сторони, досвід і особливості вашого підходу",
          "Визначаємо, для кого ви працюєте та які запити допомагаєте вирішувати",
          "Формуємо вашу ключову цінність для клієнта",
          "Визначаємо основні смисли для комунікації",
        ],
      },
      {
        title: "Особистий бренд",
        items: [
          "Формуємо основу особистого бренду навколо вашої особистості, досвіду та цінностей",
          "Визначаємо теми та смисли, з якими ви хочете асоціюватися",
          "Будуємо зрозумілу систему контенту",
          "Працюємо із самопрезентацією та проявленістю",
          "Вчимося говорити про свої послуги без відчуття нав’язування",
        ],
      },
      {
        title: "У результаті",
        items: [
          "Розумієте, куди рухаєтеся і навіщо",
          "Можете коротко й зрозуміло розповісти, хто ви і чим займаєтеся",
          "Впевненіше говорите про свою експертність",
          "Маєте конкретні наступні кроки замість відчуття хаосу",
        ],
      },
      {
        title: "Вартість",
        items: [
          "4 зустрічі, 1 місяць фідбеку та підтримки — 10 000 грн",
          "8 зустрічей, 2 місяці фідбеку та підтримки — 19 000 грн",
        ],
      },
    ],
  },

  training: {
    eyebrow: "Тренінги та воркшопи",
    title: "Навички, які працюють на практиці",
    lead: "Розробляю та проводжу тренінги й воркшопи для бізнесу, команд, громадських організацій і освітніх проєктів. Допомагаю розвивати комунікацію, посилювати особистий бренд, впевнено презентувати себе та свої ідеї й перетворювати знання на практичні навички.",
    blocks: [
      {
        title: "Теми навчання",
        items: [
          "Особистий бренд і позиціювання",
          "Контент і комунікація в соціальних мережах",
          "Самопрезентація та пітчинг ідей",
          "Командна взаємодія та soft skills",
          "Медіаграмотність і критичне мислення",
          "Лідерство та розвиток soft skills для дітей і підлітків",
          "Професійна ідентичність і зміна кар’єри",
        ],
      },
    ],
  },

  facilitation: {
    eyebrow: "Для бізнесу та громадських організацій",
    title: "Фасилітація",
    lead: "Групова робота допомагає побачити рішення, до якого складно прийти самостійно, почути різні позиції та домовитися про наступні кроки.",
    blocks: [
      {
        title: "Коли потрібна фасилітація",
        items: [
          "Є незадоволення певною ситуацією або процесом",
          "Є задача, проблема чи виклик, що потребує нестандартного рішення",
          "Важливо почути альтернативні думки та подивитися на ситуацію з інших позицій",
          "Потрібно знайти проривне рішення та домовитися, як його втілювати",
        ],
      },
      {
        title: "У результаті",
        items: [
          "Учасники краще розуміють свої потреби та спільну ціль",
          "Команда знаходить ідеї та рішення в груповій роботі",
          "Учасники домовляються й ухвалюють рішення",
          "З’являється конкретний план дій для руху до мети",
        ],
      },
    ],
  },
};

function createServiceModal(data, buttonText = "Записатися") {
  const blocks = data.blocks
    .map(
      (block) => `
        <div class="service-modal__block${block.title === "Вартість" ? " service-modal__block--pricing" : ""}">
          <h4>${block.title}</h4>
          <ul>
            ${block.items.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      `,
    )
    .join("");

  return `
    <p class="service-modal__eyebrow">${data.eyebrow}</p>
    <h3 class="service-modal__title" id="service-modal-title">${data.title}</h3>
    <p class="service-modal__lead">${data.lead}</p>

    ${blocks}

    <div class="service-modal__action">
      <a class="button button--solid"  href="https://t.me/Marina_Boyiko"
          target="_blank" data-service-book>
        <span>${buttonText}</span>
        <span class="arrow" aria-hidden="true"></span>
      </a>
    </div>
  `;
}

function openServiceModal(service) {
  const data = serviceData[service];

  if (!data) return;

  serviceModalContent.innerHTML = createServiceModal(data, "Замовити");
  serviceModal.classList.add("is-open");
  serviceModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeServiceModal() {
  serviceModal.classList.remove("is-open");
  serviceModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

serviceModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    openServiceModal(button.dataset.serviceModal);
  });
});

serviceModalClose.forEach((button) => {
  button.addEventListener("click", closeServiceModal);
});

serviceModal.addEventListener("click", (event) => {
  if (event.target.closest("[data-service-book]")) {
    closeServiceModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && serviceModal.classList.contains("is-open")) {
    closeServiceModal();
  }
});

const resultsRoad = document.querySelector("[data-results-road]");

if (resultsRoad) {
  const resultsRoadObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      resultsRoadObserver.unobserve(entry.target);
    },
    {
      threshold: 0.28,
    },
  );

  resultsRoadObserver.observe(resultsRoad);
}

const expertiseData = {
  mentoring: {
    eyebrow: "Індивідуальна робота",
    title: "Менторство",
    lead: "Для експерток, які хочуть перейти на новий професійний рівень, але поки не мають ясності, як саме рухатися далі.",
    blocks: [
      {
        title: "З чим працюємо",
        items: [
          "Структуруємо ваш професійний досвід і сильні сторони",
          "Визначаємо цілі та напрямок подальшого розвитку",
          "Знаходимо точки росту й те, на чому варто сфокусуватися саме зараз",
          "Перетворюємо велику кількість ідей на зрозумілий план",
          "Працюємо з проявленістю та впевненістю у власній експертності",
        ],
      },
      {
        title: "У результаті",
        items: [
          "Розумієте, куди рухаєтеся і навіщо",
          "Бачите свої сильні сторони та можете на них спиратися",
          "Маєте конкретні наступні кроки замість відчуття хаосу",
          "Впевненіше приймаєте професійні рішення",
        ],
      },
    ],
  },

  positioning: {
    eyebrow: "Ясність у комунікації",
    title: "Позиціонування",
    lead: "Позиціонування допомагає чітко відповісти на питання: хто ви як експертка, для кого працюєте, яку цінність створюєте і чому клієнт має звернути увагу саме на вас.",
    blocks: [
      {
        title: "Що визначаємо",
        items: [
          "Вашу професійну роль та експертну нішу",
          "Сильні сторони, досвід і особливості вашого підходу",
          "Для кого ви працюєте та які запити допомагаєте вирішувати",
          "Вашу ключову цінність для клієнта",
          "Основні смисли, про які варто говорити у своїй комунікації",
        ],
      },
      {
        title: "У результаті",
        items: [
          "Можете коротко й зрозуміло розповісти, хто ви і чим займаєтеся",
          "Знаєте, на яких темах будувати свою комунікацію",
          "Менше порівнюєте себе з іншими експертами",
          "Ваш профіль і контент починають працювати як цілісна система",
        ],
      },
    ],
  },

  "personal-brand": {
    eyebrow: "Проявленість та комунікація",
    title: "Особистий бренд",
    lead: "Особистий бренд — не про створення ідеального образу. Це про зрозумілу й послідовну комунікацію вашої особистості, досвіду, цінностей та експертності.",
    blocks: [
      {
        title: "Над чим працюємо",
        items: [
          "Формуємо основу особистого бренду навколо вашої особистості",
          "Визначаємо теми та смисли, з якими ви хочете асоціюватися",
          "Будуємо зрозумілу систему контенту",
          "Працюємо із самопрезентацією та проявленістю",
          "Вчимося говорити про свої послуги без відчуття нав’язування",
        ],
      },
      {
        title: "У результаті",
        items: [
          "Ваш образ у комунікації стає цілісним і впізнаваним",
          "Знаєте, що і навіщо публікувати",
          "Впевненіше говорите про свою експертність",
          "Формуєте довіру аудиторії та потенційних клієнтів",
        ],
      },
    ],
  },
};

const expertiseModalButtons = document.querySelectorAll(
  "[data-expertise-modal]",
);

expertiseModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const expertise = button.dataset.expertiseModal;
    const data = expertiseData[expertise];

    if (!data) return;

    serviceModalContent.innerHTML = createServiceModal(data);
    serviceModal.classList.add("is-open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

const expertiseList = document.querySelector("[data-expertise-list]");

if (expertiseList) {
  const expertiseObserver = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("is-visible");
      expertiseObserver.unobserve(entry.target);
    },
    {
      threshold: 0.2,
    },
  );

  expertiseObserver.observe(expertiseList);
}

const campData = {
  about: {
    eyebrow: "Групова робота",
    title: "Мрію → Планую → Дію",
    lead: `За 3 тижні перейти від розмитого "хочеться щось змінити" до чіткого плану на рік і перших конкретних кроків, зроблених за розкладом — а не "колись потім".`,
    blocks: [
      {
        title: "Чому ця група з'явилась",
        items: [
          `Я знову і знову бачу одну картину: людина хоче змін, навіть більш-менш знає, чого хоче — але або взагалі не сідає планувати, бо не знає, з чого почати, або складає план, який через тиждень вже не працює.`,
          `Причини щоразу різні: комусь бракує внутрішнього дозволу на зміни, комусь заважають страхи, які вилазять саме в момент, коли треба чітко сформулювати мету, комусь — розмиті цілі, які неможливо ані виміряти, ані втілити, комусь — банальний хаос у часі: прокрастинація, відсутність пріоритетів, відчуття, що доба занадто коротка.`,
          `Але майже завжди в основі — відсутність зв'язку між "хочу" і конкретною дією на конкретний день.`,
          `Ця група — про те, щоб побудувати цей зв'язок: від невдоволення поточною ситуацією чи мрії — до чіткої, мотивуючої мети — і до плану дій, який реально виконується, а не переписується з місяця в місяць.`,
        ],
      },
      {
        title: "Для кого група",
        items: [
          "відчуває, що час іде, а суттєвих змін у житті немає",
          "хоче змін, але губиться, з чого почати планування",
          `вже складала цілі й плани, але вони "не спрацювали"`,
          "живе в постійному хаосі задач без чіткого розуміння пріоритетів",
          `губиться між "хочу встигнути все" і "не встигаю нічого"`,
          "прокрастинує і не розуміє справжньої причини цього",
          "хоче зайти в новий рік чи квартал з готовим планом, а не інтуїтивно",
        ],
      },
      {
        title: "З чим заходять учасниці",
        items: [
          "Я не розумію, з чого почати планувати",
          "У мене складні цілі в голові, а на папері вони розсипаються",
          "Я вже пробувала ставити цілі, але жодна не здійснилась",
          "Мені страшно навіть чітко сформулювати, чого я насправді хочу",
          "Я постійно щось відкладаю — і не розумію чому",
          "У мене в добі ті самі 24 години, що й у всіх, а часу ні на що не вистачає",
          "Я не бачу різниці між тим, що важливо, і тим, що просто термінове",
        ],
      },

      {
        title: "Як потрапити в групу",
        items: [
          "Якщо хочеш забронювати місце — пиши в дірект Інстаграму або Телеграм з позначкою «Хочу в групу планування»",
          "ТГ — @Marina_Boyiko",
          "https://www.instagram.com/maryna_boiko.coach/",
        ],
      },
    ],
  },

  program: {
    eyebrow: "Групова робота",
    title: "Мрію → Планую → Дію",
    lead: `Ми не будемо складати ще один список цілей, який через тиждень забудеться. Ми розберемось, чому попередні плани так і лишились на папері — і зробимо так, щоб цей план справді втілювався.`,
    blocks: [
      {
        title: "Що будемо робити",
        items: [
          "Розберемо, як ми реагуємо на зміни і що заважає до них підготуватися",
          "Проаналізуємо точку А і точку Б: де ви зараз, а де хочете бути, що вже є, а що варто змінити",
          "Навчимось формулювати цілі, які справді мотивують і мають чіткі критерії досягнення",
          "Складемо план — від року до кварталу, місяця й тижня, від загального до конкретного",
          `Знайдемо особисті "поглиначі часу" і справжні причини прокрастинації`,
          "Освоїмо робочі інструменти планування",
          `Щотижня ставитимемо пріоритетні дії і звірятимемось у групі — без "загубилось десь між справами"`,
        ],
      },
      {
        title: "Що буде в результаті",
        items: [
          "Зрозумієш свою реальну реакцію на зміни і навчишся до них готуватися, а не чинити несвідомий опір",
          "Матимеш чіткі цілі на рік, сформульовані так, щоб вони справді мотивували — а не лежали мертвим вантажем у нотатках",
          "Отримаєш готовий план: від річного бачення до конкретних дій на найближчий тиждень",
          "Знатимеш свої особисті поглиначі часу і матимеш інструменти з ними працювати",
          "Навчишся відрізняти важливе від термінового і фокусуватися на пріоритетному",
          "Вийдеш із програми не з одноразовим списком цілей, а з робочою системою планування",
        ],
      },
      {
        title: "Як влаштована робота",
        items: [
          "3 тижнів роботи в закритому ТГ каналі, мій фідбек + 2 тижні мого зворотного зв'язку",
          `Завдання виходять щопонеділка, середи і п'ятниці — маленькими кроками, щоб точно встигати виконувати, а не накопичувати "хвости";`,
          "Щодня я даватиму фідбек на домашні завдання",
        ],
      },
    ],
  },
};

const campModalButtons = document.querySelectorAll("[data-camp-modal]");

campModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const data = campData[button.dataset.campModal];

    if (!data) return;

    serviceModalContent.innerHTML = createServiceModal(data);
    serviceModal.classList.add("is-open");
    serviceModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  });
});

const certificates = document.querySelector("[data-certificates]");

if (certificates) {
  const viewport = certificates.querySelector("[data-cert-viewport]");
  const track = certificates.querySelector("[data-cert-track]");
  const slides = [...track.querySelectorAll(".certificate")];

  const prevButton = certificates.querySelector("[data-cert-prev]");
  const nextButton = certificates.querySelector("[data-cert-next]");

  const currentElement = certificates.querySelector("[data-cert-current]");
  const totalElement = certificates.querySelector("[data-cert-total]");

  let index = 0;
  let translate = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  totalElement.textContent = String(slides.length).padStart(2, "0");

  function getGap() {
    return parseFloat(getComputedStyle(track).gap) || 0;
  }

  function getStep() {
    if (!slides.length) return 0;

    return slides[0].getBoundingClientRect().width + getGap();
  }

  function getTrackWidth() {
    if (!slides.length) return 0;

    return (
      slides.reduce((width, slide) => {
        return width + slide.getBoundingClientRect().width;
      }, 0) +
      getGap() * (slides.length - 1)
    );
  }

  function getMaxTranslate() {
    return Math.max(
      0,
      getTrackWidth() - viewport.getBoundingClientRect().width,
    );
  }

  function getMaxIndex() {
    const step = getStep();
    const maxTranslate = getMaxTranslate();

    if (!step || !maxTranslate) return 0;

    return Math.ceil(maxTranslate / step);
  }

  function updateCertificates() {
    const step = getStep();
    const maxTranslate = getMaxTranslate();
    const maxIndex = getMaxIndex();

    index = Math.max(0, Math.min(index, maxIndex));

    translate = Math.min(index * step, maxTranslate);

    track.style.transform = `translate3d(-${translate}px, 0, 0)`;

    currentElement.textContent = String(
      Math.min(index + 1, slides.length),
    ).padStart(2, "0");

    prevButton.disabled = index === 0;
    nextButton.disabled = translate >= maxTranslate - 1;
  }

  function goNext() {
    if (nextButton.disabled) return;

    index += 1;
    updateCertificates();
  }

  function goPrev() {
    if (prevButton.disabled) return;

    index -= 1;
    updateCertificates();
  }

  nextButton.addEventListener("click", goNext);
  prevButton.addEventListener("click", goPrev);

  viewport.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.touches[0].clientX;
      touchEndX = touchStartX;
    },
    { passive: true },
  );

  viewport.addEventListener(
    "touchmove",
    (event) => {
      touchEndX = event.touches[0].clientX;
    },
    { passive: true },
  );

  viewport.addEventListener("touchend", () => {
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) < 45) return;

    if (distance > 0) {
      goNext();
    } else {
      goPrev();
    }
  });

  window.addEventListener("resize", () => {
    updateCertificates();
  });

  updateCertificates();
}

const reviews = document.querySelector("[data-reviews]");

if (reviews) {
  const viewport = reviews.querySelector("[data-reviews-viewport]");
  const track = reviews.querySelector("[data-reviews-track]");
  const slides = [...track.querySelectorAll(".review-card")];

  const prev = reviews.querySelector("[data-reviews-prev]");
  const next = reviews.querySelector("[data-reviews-next]");
  const current = reviews.querySelector("[data-reviews-current]");
  const total = reviews.querySelector("[data-reviews-total]");

  let index = 0;
  let startX = 0;
  let endX = 0;

  total.textContent = String(slides.length).padStart(2, "0");

  const getGap = () => parseFloat(getComputedStyle(track).gap) || 0;

  const getStep = () => {
    return slides[0].getBoundingClientRect().width + getGap();
  };

  const getTrackWidth = () => {
    return (
      slides.reduce(
        (width, slide) => width + slide.getBoundingClientRect().width,
        0,
      ) +
      getGap() * (slides.length - 1)
    );
  };

  const getMaxTranslate = () => {
    return Math.max(
      0,
      getTrackWidth() - viewport.getBoundingClientRect().width,
    );
  };

  const getMaxIndex = () => {
    if (!getStep()) return 0;
    return Math.ceil(getMaxTranslate() / getStep());
  };

  const updateReviews = () => {
    const maxIndex = getMaxIndex();
    const maxTranslate = getMaxTranslate();

    index = Math.max(0, Math.min(index, maxIndex));

    const translate = Math.min(index * getStep(), maxTranslate);

    track.style.transform = `translate3d(-${translate}px, 0, 0)`;

    current.textContent = String(Math.min(index + 1, slides.length)).padStart(
      2,
      "0",
    );

    prev.disabled = index === 0;
    next.disabled = translate >= maxTranslate - 1;
  };

  next.addEventListener("click", () => {
    if (next.disabled) return;
    index++;
    updateReviews();
  });

  prev.addEventListener("click", () => {
    if (prev.disabled) return;
    index--;
    updateReviews();
  });

  viewport.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0].clientX;
      endX = startX;
    },
    { passive: true },
  );

  viewport.addEventListener(
    "touchmove",
    (event) => {
      endX = event.touches[0].clientX;
    },
    { passive: true },
  );

  viewport.addEventListener("touchend", () => {
    const distance = startX - endX;

    if (Math.abs(distance) < 45) return;

    if (distance > 0 && !next.disabled) {
      index++;
    }

    if (distance < 0 && !prev.disabled) {
      index--;
    }

    updateReviews();
  });

  window.addEventListener("resize", updateReviews);

  updateReviews();
}

(function setupSeamlessMarquees() {
  const tracks = document.querySelectorAll(
    ".marquee__track, .footer-marquee__track",
  );

  const sources = [...tracks].map((track) => ({
    track,
    template: track.firstElementChild?.cloneNode(true),
  }));

  function fillTracks() {
    sources.forEach(({ track, template }) => {
      if (!template) return;

      track.style.animation = "none";
      track.replaceChildren();

      const sequence = document.createElement("div");
      sequence.style.cssText = "display:flex;align-items:center;flex-shrink:0;";

      const first = template.cloneNode(true);
      first.removeAttribute("aria-hidden");
      sequence.append(first);
      track.append(sequence);

      const target = window.innerWidth + 100;

      while (
        sequence.getBoundingClientRect().width < target &&
        sequence.children.length < 30
      ) {
        const repeat = template.cloneNode(true);
        repeat.setAttribute("aria-hidden", "true");
        sequence.append(repeat);
      }

      const duplicate = sequence.cloneNode(true);
      duplicate.setAttribute("aria-hidden", "true");
      track.append(duplicate);

      track.style.animation = "";
    });
  }

  fillTracks();

  let resizeTimer;

  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fillTracks, 150);
  });
})();
