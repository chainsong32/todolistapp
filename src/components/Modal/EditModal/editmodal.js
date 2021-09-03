import React, { useRef, useCallback } from 'react';

import './editmodal.scss';

import Modal from '../modal';
import { formatDateTime } from '../../../libs/utils';

function EditModal(props) {
    const { isShowEditModal, data, submitEdit } = props,
        inputRef = useRef(),
        checkRef = useRef();

    const formatNewData = useCallback(() => {

        const inputLen = inputRef.current.value.trim().length;

        if (inputLen === 0) {
            inputRef.current.value = data.content;
            return;
        }

        const newData = {
            id: new Date().getTime(),
            content: inputRef.current.value,
            completed: checkRef.current.checked,
        };

        submitEdit(newData, data.id);
    }, [submitEdit, data]);

    return (
        <Modal isShowModal={isShowEditModal} modalTitle="编辑事件">
            <p className="topic">时间：{formatDateTime(data.id)}</p>
            <p className="topic">
                <textarea
                    ref={inputRef}
                    defaultValue={data.content}
                    className="text-area"
                ></textarea>
            </p>
            <p className="topic">
                状态：
                <input
                    type="checkbox"
                    defaultChecked={data.completed ? true : false}
                    ref={checkRef}
                />
            </p>
            <button className="btn btn-primary comfirm-btn" onClick={formatNewData}>
                确定
            </button>
        </Modal>
    );
}

export default EditModal;