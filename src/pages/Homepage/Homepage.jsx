import styles from './Homepage.module.css'

export default function Homepage() {
    return(
        <main id='mainContainer'>

            <header id="page-titles">
                <h2 className="name-title">
                    best
                    <span className='red-hl'>ovo</span>
                </h2>
                <h1 className="main-title">
                    HELPING YOUTUBERS <span className='red-hl'>BOOST QUALITY </span> & <span className="red-hl">WATCHTIME </span> WITH SKILLED <span className="red-hl">EDITING</span>
                </h1>
            </header>

            <article className={styles.aboutContainer}>
                <img src="https://media.gettyimages.com/id/2169740304/photo/college-student-outdoor-travel-chest-bag.jpg?s=612x612&w=gi&k=20&c=IKDLlxtx3ScYE8e2Xsi9ebiwjFbivfbT48wS6BCs4tk=" alt="A picture of Bestovo, a japanese guy." className={styles.aboutImg} />

                <aside className={styles.aboutContents}>
                    <h3 className={styles.aboutTitle}>
                        About <span className="red-hl">Me</span>
                    </h3>

                    <p className={styles.aboutText}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam adipisci ad labore dolores tempore, at iusto itaque nesciunt molestias quas neque officiis reiciendis, molestiae dolorem. Aut sit, reiciendis beatae eligendi voluptatum, quo ex doloribus odio, eius consequuntur impedit debitis commodi!
                    </p>
                    <p className={styles.aboutText}>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis distinctio corrupti animi explicabo porro. Aliquam doloribus numquam quam nam necessitatibus eum voluptatibus itaque! Laudantium beatae molestias, ea itaque nihil amet provident. Velit facilis voluptatum voluptatem accusantium, quam architecto? Suscipit, consequuntur!
                    </p>

                    <div className={styles.contactContainer}>
                        <a href="" className={styles.contact}>
                            <i className="bi bi-discord"></i>
                            Discord
                        </a>
                        <a href="" className={styles.contact}>
                            <i className="bi bi-twitter-x"></i>
                            Twitter
                        </a>
                        <a href="" className={styles.contact}>
                            <i className="bi bi-envelope-fill"></i>
                            Gmail
                        </a>
                    </div>
                </aside>
            </article>


        </main>
    )
}