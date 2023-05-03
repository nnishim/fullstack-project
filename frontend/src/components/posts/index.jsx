import React from 'react';
import styles from './styles.module.scss';
import PostsList from "./posts-list";
import {Link} from "react-router-dom";

const Posts = () => {
	return (
		<>
			<div className={styles.wrap}>
				<div className={styles.create_post}>
					<Link className={styles.create_post__btn} to='/create-post'>Добавить пост</Link>
				</div>
				<PostsList/>
			</div>
		</>
	);
};

export default Posts;