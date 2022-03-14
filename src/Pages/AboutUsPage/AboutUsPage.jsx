import React from "react";
import AboutUsPageStyles from "./AboutUsPage.module.css";
import Visibility from "../../Images/AboutUsVisibility.jfif";
import Heroes from "../../Images/AboutUsHeroes.jfif";
import Allies from "../../Images/AboutUsAllies.jfif";
import DavidCha from "../../Images/DavidCha.jfif";
import AllyZhang from "../../Images/AllyZhang.jfif";
import AudreyForonda from "../../Images/AudreyForonda.jfif";
import SamKim from "../../Images/SamKim.jfif";
import JasonYang from "../../Images/JasonYang.jfif";
import CagatayErsoy from "../../Images/CagatayErsoy.jfif";
import Placeholder from "../../Images/Placeholder.png";
import CoryCoupe from "../../Images/CoryCoupe.jfif";
import KathyWang from "../../Images/KathyWang.jfif";
import PeterBanh from "../../Images/PeterBanh.jfif";

const AboutUsPage = () => {

	const team = [
		{ id: 1, firstName: "David", lastName: "Cha", position: "Founder/Product Manager", img: DavidCha },
		{ id: 2, firstName: "Ally", lastName: "Zhang", position: "Founder/Operations Manager", img: AllyZhang },
		{ id: 3, firstName: "Audrey", lastName: "Foronda", position: "Founder/Product Designer", img: AudreyForonda },
		{ id: 4, firstName: "Sam", lastName: "Kim", position: "User Researcher", img: SamKim },
		{ id: 5, firstName: "Jason", lastName: "Yang", position: "Data Scientist", img: JasonYang },
		{ id: 6, firstName: "Cagatay", lastName: "Ersoy", position: "Software Engineer", img: CagatayErsoy },
		{ id: 7, firstName: "Antoinette", lastName: "Lee", position: "Software Engineer", img: Placeholder },
		{ id: 8, firstName: "Cory", lastName: "Coupe", position: "Software Engineer", img: CoryCoupe },
	];

	const alumni = [
		{ id: 9, firstName: "Kathy", lastName: "Wang", position: "Founder/Product Designer", img: KathyWang },
		{ id: 10, firstName: "Peter", lastName: "Banh", position: "Founder/Software Engineer", img: PeterBanh },
	];

	const renderGroup = (group) => {
		return group.map(person =>
			<div key={person.id}>
				<img className={AboutUsPageStyles.Image} src={person.img} alt="" />
				<p className={AboutUsPageStyles.Caption}><strong>{person.firstName} {person.lastName}</strong></p>
				<p className={AboutUsPageStyles.Caption}>{person.position}</p>
			</div>
		);
	}

	return (
		<div className={AboutUsPageStyles.Container}>

			<nav className={AboutUsPageStyles.Nav}>
				<a className={AboutUsPageStyles.Link} href="/"><strong>Allied Voices</strong></a>
				<a className={AboutUsPageStyles.Link} href="/about-us">About us</a>
			</nav>

			<section className={AboutUsPageStyles.Section}>
				<h2 className={AboutUsPageStyles.Heading}>Building friendlier and healthier communities by...</h2>
				<div className={AboutUsPageStyles.Community}>
					<div>
						<img className={AboutUsPageStyles.Image} src={Visibility} alt="" />
						<p className={AboutUsPageStyles.Caption}>Bringing visibility to racism</p>
					</div>
					<div>
						<img className={AboutUsPageStyles.Image} src={Heroes} alt="" />
						<p className={AboutUsPageStyles.Caption}>Highlighting the heroes who are fighting racism</p>
					</div>
					<div>
						<img className={AboutUsPageStyles.Image} src={Allies} alt="" />
						<p className={AboutUsPageStyles.Caption}>Providing opportunities to practice allyship</p>
					</div>
				</div>
			</section>
			
			<section className={AboutUsPageStyles.Section}>
				<h2 className={AboutUsPageStyles.Heading}>Our story</h2>
				<p className={AboutUsPageStyles.Story}>On April 3rd, 2020, a team of five came together from across the world to figure out how to protect vulnerable populations in the midst of a worldwide pandemic. While other teams at the MIT COVID-19 hackathon focused on the health-related impacts of COVID-19, our team looked at the social impacts of the pandemic. Having witnessed the rise in race-related incidents and the growing fear in the community, we felt compelled to address the deep-rooted, yet under-addressed, issue of racism. We created a platform to bring visibility to racism, as well as to showcase acts of solidarity and provide resources for education. Our goal was simple: inspire acts of allyship through conversation. After all, protests change policies, but conversations heal communities.</p>
				<p className={AboutUsPageStyles.Story}>Allied Voices is an award-winning organization with mentors from the Massachusetts Institute of Technology (MIT) and Boston Consulting Group (BCG). We have given talks at Austin Design Week, UX Camp Chicago, and New Services for the New Normal. In just the past year, our team has grown to over ten people, and we're constantly on the search for new team members to bring Allied Voices to the next level.</p>
			</section>

			<section className={AboutUsPageStyles.Section}>
				<h2 className={AboutUsPageStyles.Heading}>Meet the team</h2>
				<div className={AboutUsPageStyles.People}>{renderGroup(team)}</div>
			</section>

			<section className={AboutUsPageStyles.Section}>
				<h2 className={AboutUsPageStyles.Heading}>Alumni</h2>
				<div className={AboutUsPageStyles.People}>{renderGroup(alumni)}</div>
			</section>

		</div>
	);
}

export default AboutUsPage;