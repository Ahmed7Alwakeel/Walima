import { useRouter } from "next/router"

const LangSwitcher = ({ children }) => {
	// const { locale, push, reload, pathname } = useRouter()
	const router = useRouter()
	const { pathname, asPath, query } = router
	const nextLocale = router.locale === "en" ? "ar" : "en"
	const onClick = () => {
		router.push({ pathname: pathname, query: query }, asPath, {
			locale: nextLocale,
		})
	}

	return (
		<div style={{ display: "flex", gap: "1.875rem" }} onClick={onClick}>
			{children}
		</div>
	)
}

export default LangSwitcher