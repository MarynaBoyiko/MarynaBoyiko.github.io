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
    ],
  },

  training: {
    eyebrow: "Тренінги та воркшопи",
    title: "Навички, які працюють на практиці",
    lead: "Практичні навчальні формати для експертів, команд, дітей і підлітків із фокусом на комунікації, проявленості та розвитку.",
    blocks: [
      {
        title: "Теми",
        items: [
          "Розвиток особистого бренду та позиціонування через особистість",
          "Контент",
          "Самопрезентація",
          "Лідерство для підлітків",
          "Медіаграмотність",
          "Розвиток soft skills для дітей і підлітків",
          "Професійна ідентичність",
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

function createServiceModal(data) {
  const blocks = data.blocks
    .map(
      (block) => `
        <div class="service-modal__block">
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
      <a class="button button--solid" href="#contacts" data-service-book>
        <span>Записатися</span>
        <span class="arrow" aria-hidden="true"></span>
      </a>
    </div>
  `;
}

function openServiceModal(service) {
  const data = serviceData[service];

  if (!data) return;

  serviceModalContent.innerHTML = createServiceModal(data);
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
    eyebrow: "Коучинговий кемп · групова робота",
    title: "Знаю → роблю",
    lead: "Глибока коучингова робота для тих, хто знає, що хоче зробити, має ідею чи навіть план, але знову і знову застрягає між наміром і реальною дією.",
    blocks: [
      {
        title: "Чому з’явилася ця група",
        items: [
          "Ти знаєш, що робити, маєш ідею і навіть план — але дії немає",
          "Перфекціонізм змушує чекати моменту, коли можна буде зробити відразу ідеально",
          "Постійна запара й розфокус не залишають місця для реалізації",
          "Страх і невпевненість з’являються саме в момент старту",
          "Порівняння з іншими забирає енергію та бажання рухатися",
          "Бездіяльність пояснюється лінню чи слабкою дисципліною, хоча реальна причина може бути зовсім іншою",
        ],
      },
      {
        title: "Для кого група",
        items: [
          "Для тих, хто втомився все тягнути на собі й жити в постійному авралі",
          "Для тих, хто застряг у рутині й не відчуває власного руху та розвитку",
          "Для тих, хто знає, чого хоче, але ніяк не може почати",
          "Для тих, хто постійно відкладає старт, публікацію чи важливе рішення",
          "Для тих, хто живе в розфокусі та постійно перемикається між задачами",
          "Для тих, хто хоче перестати повертатися до сценарію самозвинувачення й відкладання",
        ],
      },
      {
        title: "Що будемо робити",
        items: [
          "Знайдемо справжню причину застрягання та відкладання",
          "Працюватимемо з розфокусом, страхом і внутрішнім критиком",
          "Зробимо аудит життя та цілей",
          "Працюватимемо зі страхами, переконаннями, самооцінкою та енергією",
          "Щотижня визначатимемо конкретну дію й доводитимемо її до кінця",
          "Сформуємо нові звички та подальшу стратегію самостійних дій",
        ],
      },
      {
        title: "Що буде в результаті",
        items: [
          "Зрозумієш, що насправді тебе блокує",
          "Навчишся помічати момент, у якому виникає стоп-сигнал",
          "Повернеш більше ясності, опори на себе та довіри до власних рішень",
          "Почнеш робити послідовні щоденні дії",
          "Навчишся фокусуватися на тому, що справді важливо",
          "Забереш із собою інструменти та опору для подальших самостійних дій",
        ],
      },
      {
        title: "Як влаштована робота",
        items: [
          "5 тижнів: 3 онлайн-коучингові зустрічі + 2 тижні підтримки",
          "Завдання виходять у понеділок, середу та п’ятницю маленькими кроками",
          "На групових коучингах розбираємо конкретні застрягання кожної учасниці",
          "Між зустрічами — виконання завдань і підтримка в груповому чаті",
          "Фінальна зустріч — стратегічна сесія подальших самостійних дій",
        ],
      },
      {
        title: "Участь",
        items: [
          "Старт — 7 вересня 2026 року",
          "Вартість — 2 000 грн",
          "Для запису: Telegram @Marina_Boyiko або Instagram @maryna_boiko.coach",
        ],
      },
    ],
  },
  program: {
    eyebrow: "Програма коучингового кемпу",
    title: "Знаю → роблю",
    lead: "Це не марафон і не інтенсив. Це коучингова робота, де ми вчимося знову опиратися на себе та переводити внутрішній діалог у конкретні регулярні дії.",
    blocks: [
      {
        title: "1 тиждень · Ясність",
        items: [
          "Знайомство",
          "Аудит життя",
          "Визначення цілей",
          "Запит на зміни та результат, який хочеться отримати",
          "Check-up ситуації: що саме зараз не влаштовує",
          "Груповий коучинг №1 — чому я застрягла",
        ],
      },
      {
        title: "2 тиждень · Внутрішня опора",
        items: [
          "Страхи та переконання",
          "Робота з негативними переконаннями про себе та гроші",
          "Самооцінка",
          "Розширення знань про себе",
          "Енергія: звідки вона береться, як її накопичувати й розподіляти",
          "Груповий коучинг №2 — як почати діяти й формувати нові звички",
        ],
      },
      {
        title: "3 тиждень · Дія",
        items: [
          "Маленькі послідовні дії",
          "Втілення власних цілей",
          "Створення системи підтримки",
          "Формування нових звичок",
          "Check-up того, що вже виходить і де ще потрібна допомога",
          "Створення індивідуального плану розвитку",
          "Фінальна стратегічна зустріч",
        ],
      },
      {
        title: "+ 2 тижні після кемпу",
        items: [
          "Чат групи залишається відкритим",
          "Можна звертатися за підтримкою та порадою",
          "Перевіряємо, як нові дії та звички працюють уже без структури основної програми",
          "Закріплюємо власну систему подальшого руху",
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
