import './App.css'
import React, { useState, useCallback, useEffect } from 'react'
import MyHeader from './components/Header/header'
import AddInput from './components/AddInput/input'
import TodoItem from './components/TodoItem/todoitem'
import Checkmodal from './components/Modal/CheckModal/checkmodal'
import EditModal from './components/Modal/EditModal/editmodal'
import NoDataTip from './components/NoDataTip/nodatatip'

function App() {
  const [isInputShow, setInputShow] = useState(false)
  const [todoList, setTodoList] = useState([])
  const [isShowCheckModal, setShowCheckModal] = useState(false)
  const [isShowEditModal, setShowEditModal] = useState(false)
  const [currentData, setCurrentData] = useState({})


  //页面刷线数据缓存
  useEffect(() => {
    const todoData = JSON.parse(localStorage.getItem('todoData') || '[]')
    setTodoList(todoData)
  }, [])
  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoList))
  }, [todoList])


  //添加事件
  const addItem = useCallback((value) => {
    const dataItem = {
      id: new Date().getTime(),
      content: value,
      completed: false
    }
    setTodoList((todoList) => [...todoList, dataItem])
    setInputShow(false)
  }, [])

  //打开事件详情
  const openCheckModal = useCallback((id) => {
    _setCurrentData(todoList, id)
    setShowCheckModal(true)
  }, [todoList])

  //编辑事件
  const openEditModal = useCallback((id) => {
    _setCurrentData(todoList, id)
    setShowEditModal(true)
  }, [todoList])

  //提交编辑事件
  const submitEdit = useCallback(
    (newData, id) => {
      setTodoList((todoList) =>
        todoList.map((item) => {
          if (item.id === id) {
            item = newData;
          }
          return item;
        })
      );
      setShowEditModal(false);
    },
    []
  );

  function _setCurrentData(todoList, id) {
    setCurrentData(() => todoList.filter(item => item.id === id)[0])
  }

  //完成事件,通过属性传递给子组件,使用useCallback
  const completeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    }));
  }, [])


  //删除事件
  const removeItem = useCallback((id) => {
    setTodoList((todoList) => todoList.filter((item) => item.id !== id));
  }, []);


  return (
    <div className="App">
      <Checkmodal
        data={currentData}
        isShowCheckModal={isShowCheckModal}
        closeModal={() => setShowCheckModal(false)}
      />
      <EditModal
        isShowEditModal={isShowEditModal}
        data={currentData}
        submitEdit={submitEdit}
      />
      <MyHeader
        openInput={() => setInputShow(!isInputShow)}
      />
      <AddInput
        isInputShow={isInputShow}
        addItem={addItem}
      />
      {!todoList || todoList.length === 0 ? (
        <NoDataTip />
      ) : (
        <ul className="todo-list">
          {
            todoList.map((item, index) => {
              return (
                <TodoItem
                  data={item}
                  key={index}
                  openCheckModal={openCheckModal}
                  openEditModal={openEditModal}
                  completeItem={completeItem}
                  removeItem={removeItem}
                />
              )
            })
          }
        </ul>
      )}
    </div>
  );
}

export default App;
