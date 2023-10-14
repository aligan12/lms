import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import classes from './HomePage.module.scss'

import { ERoutePath } from 'app/providers/AppRouters'

import { getUserInfo, getUserToken, getUserType } from 'entities/Users/CustomUser'

import Cloud from 'shared/assets/png/C1.png'
import Cloud2 from 'shared/assets/png/C2.png'
import Arm from 'shared/assets/svg/Arm.svg'
import Rocket from 'shared/assets/svg/Rocket.svg'
import { Button, DoughnutChart, Htag, Icon, Loader, VerticalBarChart } from 'shared/ui'

const HomePage = () => {
	const navigate = useNavigate()
	const { t } = useTranslation('home')
	const userType = useSelector(getUserType)
	const handleClick = () => {
		if (userType === 'not-auth') {
			navigate(ERoutePath.AUTHORIZATION)
		} else if (userType === 'student') {
			navigate(ERoutePath.MY_COURSES)
		} else if (userType === 'admin' || userType === 'super-admin') {
			navigate(ERoutePath.TEACHER_ROOM)
		}
	}
	return (
		<div>
			<div className={classes.wrapper}>
				<div className={classes.text_wrapper}>
					<div className={classes.text}>
						<Htag
							styles={classes.text}
							tag={'very-large'}
						>
							{t('pokorite-novye-vershiny-znanii')}
							<Rocket className={classes.rocket} />
							<br /> {t('nachnite-svoi-obrazovatelnyi-put-pryamo-seichas')}
						</Htag>

						<Htag
							tag={'small'}
							styles={classes.small_text}
						>
							{t(
								'nachnite-smenite-ili-razvivaite-kareru-s-pomoshyu-bolee-chem-5400-kursov-professionalnykh-sertifikacii-i-diplomnykh-programm-ot-universitetov-i-kompanii-mirovogo-urovnya',
							)}
						</Htag>
					</div>

					<div className={classes.buttons}>
						<Button
							onClick={handleClick}
							variation="primary"
							styles={classes.button}
							format={'large'}
						>
							{t('nachat')} <Arm />
						</Button>
					</div>
				</div>
				<div className={classes.image_container}>
					<img
						className={classes.cloud1}
						src={Cloud}
					/>
				</div>
				<div className={classes.image_container}>
					<img
						className={classes.cloud2}
						src={Cloud2}
					/>
				</div>
				<img
					className={classes.cloud3}
					src={Cloud}
				/>
			</div>
		</div>
	)
}

export default HomePage
