import React from 'react'
import styles from './styles.module.scss'

const Popup = ({text, yesButton, noButton, show, setShow}) => {
	return (
		<div className={`${styles.popup} ${show ? styles.popup_active : ''}`} onClick={() => setShow(state => !state)}>
			<div className={styles.popup__body}>
				<p className={styles.popup__text}>{text}</p>
				<div className={styles.popup__buttons} onClick={(e) => e.stopPropagation()}>
					<button className={styles.popup__button} onClick={() => yesButton()}>Yes</button>
					<button className={styles.popup__button} onClick={() => noButton()}>No</button>
				</div>
			</div>
		</div>)
}

export default Popup