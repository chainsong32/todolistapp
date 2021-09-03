import React from 'react'
import './checkmodal.scss'
import Modal from '../modal'
import { formatDateTime } from '../../../libs/utils.js'

function Checkmodal(props) {
    const { isShowCheckModal, data, closeModal } = props

    return (
        <Modal
            isShowModal={isShowCheckModal}
            modalTitle="查看事件"
        >
            <p className="topic">时间:{formatDateTime(data.id)}</p>
            <p className="topic">内容:{data.content}</p>
            <p className="topic">状态:{data.completed ? '已完成' : '未完成'}</p>
            <button
                className="btn btn-primary confirm-btn"
                onClick={closeModal}
            >确定</button>
        </Modal>
    )
}

export default Checkmodal
