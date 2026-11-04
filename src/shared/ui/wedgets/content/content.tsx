import styles from "./content.module.css";
import ProcessSteps from "@/shared/ui/wedgets/processSteps/processSteps";
import ContactCTA from "@/shared/ui/wedgets/сontactCTA/contactCTA";

const services = [
  {
    title: "Разработка сайтов",
    description:
      "Лендинги, сайты для бизнеса и интернет-магазины. Формирую структуру, создаю интерфейс и реализую функциональность под задачи проекта.",
    features: [
      "Структура страниц и понятная навигация.",
      "Адаптивная вёрстка для компьютеров и телефонов.",
      "Формы заявок, каталоги и необходимые интеграции.",
    ],
  },
  {
    title: "Доработка и развитие",
    description:
      "Если сайт уже существует, не обязательно начинать заново. Помогу обновить отдельные страницы, исправить ошибки и добавить недостающие возможности.",
    features: [
      "Новые разделы и функции.",
      "Исправление вёрстки и апгрейд адаптивности.",
      "Оптимизация скорости загрузки",
    ],
  },
  {
    title: "Веб-приложения",
    description:
      "Личные кабинеты, сервисы и инструменты для рабочих задач. Продумываю не только внешний вид, но и то, как пользователь будет взаимодействовать с продуктом.",
    features: [
      "Интерфейсы со сложными сценариями.",
      "Работа с API и данными.",
      "Индикаторы загрузки, сообщения об ошибках и подтверждения выполненных действий.",
    ],
  },
];

const principles = [
  {
    title: "Прямое общение",
    description:
      "Работаю в тесном контакте с заказчиком. Обсуждаем идеи, ограничения и изменения без лишних посредников. Объясняю технические решения понятным языком.",
  },
  {
    title: "Прозрачный процесс",
    description:
      "До начала работы согласуем объём, этапы и ожидаемый результат. По ходу выполнения проекта знакомлю с промежуточными версиями и учитываю дополнительные предложения.",
  },
  {
    title: "Внимание к деталям",
    description:
      "Продумываю не только основной экран, но и мобильную версию, формы, навигацию и состояния элементов. Учитываю, что увидит пользователь во время загрузки, при ошибке или после отправки заявки.",
  },
];

export default function MainContent() {
  return (
    <div className={styles.content}>
      <section
        id="services"
        className={`${styles.section} ${styles.services}`}
        aria-labelledby="services-title"
      >
        <h2
          id="services-title"
          className={`${styles.sectionTitle} ${styles.servicesTitle}`}
        >
          Что я делаю
        </h2>
        <p className={styles.servicesIntro}>
          Создаю новые проекты и помогаю развивать существующие. Можно
          обратиться с начальной идеей — вместе определим, что нужно сделать.
        </p>
        <ol className={styles.servicesGrid}>
          {services.map((service, index) => (
            <li className={styles.service} key={service.title}>
              <span className={styles.serviceNumber} aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.itemTitle}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
              <ul className={styles.serviceFeatures}>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
      <ProcessSteps />
      <section
        id="about"
        className={`${styles.section} ${styles.about}`}
        aria-labelledby="about-title"
      >
        <div className={styles.aboutIntro}>
          <h2
            id="about-title"
            className={`${styles.sectionTitle} ${styles.aboutTitle}`}
          >
            Личный подход
            <br />к каждой задаче
          </h2>
          <div className={styles.aboutCopy}>
            <p className={styles.aboutText}>
              Работаю напрямую — от первого обсуждения до запуска. Сначала
              разбираюсь, для кого создаётся проект, какую задачу он должен
              решать и что действительно важно на старте.
            </p>
            <p className={styles.aboutText}>
              Нет готового технического задания - начнем с разговора.
              Систематизирую все требования, определяю приоритеты и разделяю
              работу на этапы.
            </p>
          </div>
        </div>
        <ul className={styles.principles}>
          {principles.map((principle) => (
            <li className={styles.principle} key={principle.title}>
              <h3 className={styles.principleTitle}>{principle.title}</h3>
              <p className={styles.description}>{principle.description}</p>
            </li>
          ))}
        </ul>
      </section>
      <ContactCTA />
    </div>
  );
}
