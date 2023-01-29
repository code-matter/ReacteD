import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

const IntlBtn = () => {
    const { i18n } = useTranslation()
    return (
        <Button onClick={() => i18n?.changeLanguage(i18n?.language === 'fr' ? 'en' : 'fr')}>
            {i18n?.language === 'fr' ? 'en' : 'fr'}
        </Button>
    )
}

export default IntlBtn
