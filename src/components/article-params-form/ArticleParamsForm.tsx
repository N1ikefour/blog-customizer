import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { Select } from '../select';

type ArticleParamsFormProps = { 
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
}

export const ArticleParamsForm = ({currentArticleState, setCurrentArticleState}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] = useState<ArticleStateType>(currentArticleState)

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({... selectArticleState, [key]: value});
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(false),
		onChange: setIsOpen,
		event: 'mousedown',
	})

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={setIsOpen} isOpen={isOpen}/>
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>
				<form 
					className={styles.form} 
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectArticleState)
					}}
					onReset={(e)=> {
						e.preventDefault();
						setCurrentArticleState(defaultArticleState)
						console.log(defaultArticleState)
					}}>
					<Select 
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>handleChange('fontFamilyOption', option)}
						title='Шрифт'
					/>

					<Select
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>handleChange('fontSizeOption', option)}
						title='Размер шрифта'
					/>


					<Select
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(option) =>handleChange('fontColor', option)}
						title='Цвет шрифта'
					/>

					<Select
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(option)=>handleChange('backgroundColor', option)}
						title='Цвет фона'
					/>

					<Select
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(option)=>handleChange('contentWidth', option)}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={()=>defaultArticleState} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
