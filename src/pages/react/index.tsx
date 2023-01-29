import { Modal } from 'antd'
import { useState } from 'react'
import useUserStore from 'store/user'

const React = () => {
    const { name, age } = useUserStore()

    const [modalOpen, setModalOpen] = useState<boolean>(true)

    const handleOk = () => {
        setModalOpen(false)
    }
    const handleCancel = () => {
        setModalOpen(false)
    }
    return (
        <div>
            <Modal title='Basic Modal' open={modalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h1>{name}</h1>
                <h2>{age}</h2>
            </Modal>
        </div>
    )
}

export default React
