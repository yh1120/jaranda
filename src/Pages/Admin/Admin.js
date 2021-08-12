import React, { useEffect, useState } from 'react';
import Modal from 'Modal';
import SignUp from 'Pages/SignUp';
import searchIcon from 'Assets/search.png';
import { style } from './AdminStyle';
import { MENUS, LOCAL_STORAGE, LIMIT } from 'utils/constants';
import { getUserInfo } from 'utils/getUserInfo';
import Checkbox from 'Components/Checkbox';
import Layout from 'Components/Layout';
import { AiOutlineCheck } from 'react-icons/ai';

function Admin() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [modalStyle, setModalStyle] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pages, setPages] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const userInfo = getUserInfo(pages, LIMIT, searchValue);
    setData(userInfo.userData);
    setMaxPage(userInfo.maxPage);
  }, [pages, searchValue, isSubmit]);

  const onHandleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickChckBtn = (indexs, page, path) => {
    const selectedUserIdx = indexs;
    const userMenu = data[selectedUserIdx].menubar;
    const thisMenu = userMenu.findIndex((menu) => menu.name === page);
    console.log(thisMenu);
    let newMenu;
    if (thisMenu === -1) {
      newMenu = userMenu.concat([{ name: page, path: path }]);
    } else {
      newMenu = userMenu
        .slice(0, thisMenu)
        .concat(userMenu.slice(thisMenu + 1));
    }
    console.log(newMenu);
    const newUserInfo = data.map((user, idx) => {
      if (indexs === idx) {
        return { ...user, menubar: newMenu };
      }
      return user;
    });
    console.log(newUserInfo);
    setData(newUserInfo);
  };

  const isSelected = (indexs, name) => {
    const userMenu = data[indexs].menubar;
    console.log(data[indexs], userMenu);
    const temp = userMenu.findIndex((menu) => menu.name === name);
    if (temp >= 0) {
      return true;
    }
    return false;
  };

  const sendData = (data) => {
    const originalData = LOCAL_STORAGE.get('userData');
    const newData = originalData.map((user) => {
      const updatedUser = data.filter(
        (datum) => datum.userId === user.userId,
      )[0];
      return updatedUser ? updatedUser : user;
    });
    console.log(newData);
    LOCAL_STORAGE.set('userData', newData);
    return true;
  };

  const onClickSubmitBtn = () => {
    setIsSubmit(sendData(data));
    setTimeout(function () {
      setIsSubmit(false);
    }, 3000);
  };

  const onClickButtonLeft = () => {
    const page = pages - 1;
    if (page < 1) {
      setPages(1);
    } else {
      setPages(page);
    }
  };

  const onClickButtonRight = () => {
    const page = pages + 1;
    if (page > maxPage) {
      setPages(maxPage);
    } else {
      setPages(page);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setModalStyle(!modalStyle);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalStyle(!modalStyle);
  };

  return (
    <Layout>
      <TableContainer>
        <TableTitleContainer>
          <TableTitleBox>
            <TableTitle>사용자 목록</TableTitle>
            <AccountAddButton onClick={() => openModal()}>
              계정 추가
            </AccountAddButton>
          </TableTitleBox>
          <SearchContainer>
            <SearchIcon src={searchIcon} alt="search-icon" />
            <Searchbox
              type="text"
              placeholder="Search Name, ID"
              onChange={onHandleSearch}
            />
            {!isSubmit && (
              <PageAuthButton onClick={onClickSubmitBtn}>
                페이지 권한 확정하기
              </PageAuthButton>
            )}

            {isSubmit && (
              <PageAuthButton disabled={true}>
                <AiOutlineCheck />
                확정되었습니다.
              </PageAuthButton>
            )}
          </SearchContainer>
        </TableTitleContainer>

        <table>
          <thead>
            <tr>
              <Cell>ID</Cell>
              <Cell>Name</Cell>
              <Cell>Age</Cell>
              <Cell>Role</Cell>
              <Cell>Address</Cell>
              <Cell>Menu</Cell>
            </tr>
          </thead>
          {data &&
            data.map((data, indexs) => (
              <tbody key={indexs}>
                <tr key={indexs}>
                  <Cell>{data.userId}</Cell>
                  <Cell>{data.name}</Cell>
                  <Cell>{data.age}</Cell>
                  <Cell>{data.role}</Cell>
                  <Cell>{data.address}</Cell>
                  <Cell>
                    {MENUS.map((property, index) => {
                      let isItemSelected = isSelected(
                        indexs,
                        property.name,
                        data.userId,
                      );

                      return (
                        <div key={index}>
                          <Checkbox
                            type="checkbox"
                            checked={isItemSelected}
                            id={index}
                            onClick={() =>
                              onClickChckBtn(
                                indexs,
                                property.name,
                                property.path,
                                data.userId,
                              )
                            }
                          />
                          <label>{property.name}</label>
                        </div>
                      );
                    })}
                  </Cell>
                </tr>
              </tbody>
            ))}
        </table>
        <TableFooter>
          <div>
            <AiOutlineLeftStyle
              pageend={pages === 1 ? 'true' : 'false'}
              onClick={onClickButtonLeft}
            />
            <div>{pages}</div>
            <AiOutlineRightStyle
              pageend={pages === maxPage ? 'true' : 'false'}
              onClick={onClickButtonRight}
            />
          </div>
        </TableFooter>
      </TableContainer>
      <Modal
        show={showModal}
        onClickClose={() => closeModal()}
        accountStyle={modalStyle}
      >
        <SignUp accountPlus={modalStyle} />
      </Modal>
    </Layout>
  );
}

export default Admin;

const {
  Cell,
  AccountAddButton,
  Searchbox,
  SearchContainer,
  SearchIcon,
  TableContainer,
  TableTitleBox,
  TableFooter,
  TableTitle,
  TableTitleContainer,
  PageAuthButton,
  AiOutlineLeftStyle,
  AiOutlineRightStyle,
} = style;
