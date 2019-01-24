import React, {Component} from 'react';
import './index.css';
import {WhiteSpace, List, ActivityIndicator, Modal, ImagePicker, InputItem, Button} from 'antd-mobile';
import {deleteuser, userbyprops, storebyprops, createstore, updatestore} from "../../gql";
import {Query, Mutation} from "react-apollo";
import gql from "graphql-tag";

const alert = Modal.alert;
const Item = List.Item;

class Store extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {userID} = this.props;
        return (
            <div>
                <WhiteSpace/>
                <StoreDetailFetch/>
                <ManagePeople userID={userID}/>
            </div>
        );
    }
}

export default Store;

class ManagePeople extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {userID} = this.props;
        return (
            <Query query={gql(userbyprops)} variables={{}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading">
                                    <div className="align">
                                        <ActivityIndicator text="Loading..." size="large"/>
                                    </div>
                                </div>
                            );
                        }

                        if (error) {
                            return 'error!';
                        }

                        let admins = data.userbyprops.filter(user => user.admin === 'true');

                        return (
                            <List renderHeader={() => '管理员人员'} className="my-list">
                                {
                                    admins.map((user, index) =>
                                        <Mutation
                                            mutation={gql(deleteuser)}
                                            refetchQueries={[
                                                {query: gql(userbyprops), variables: {}},
                                            ]}
                                            key={user.id}
                                        >
                                            {(deleteuser, {loading, error}) => {
                                                if (loading)
                                                    return (
                                                        <div className="loading">
                                                            <div className="align">
                                                                <ActivityIndicator text="Loading..." size="large"/>
                                                            </div>
                                                        </div>
                                                    );
                                                if (error)
                                                    return 'error';
                                                return (
                                                    <Item
                                                        key={user.id}
                                                        arrow="horizontal"
                                                        multipleLine
                                                        onClick={() => {
                                                            if (user.id === userID) {
                                                                alert('该账号为此登录账号', '无法执行删除操作', [
                                                                    {
                                                                        text: '好的',
                                                                        onPress: () => console.log('cancel'),
                                                                        style: 'default'
                                                                    }
                                                                ]);
                                                            } else {
                                                                alert('删除该管理员', '确认删除吗', [
                                                                    {
                                                                        text: '取消',
                                                                        onPress: () => console.log('cancel'),
                                                                        style: 'default'
                                                                    },
                                                                    {
                                                                        text: '确定', onPress: () => {
                                                                            deleteuser({variables: {id: user.id}})
                                                                        }
                                                                    },
                                                                ]);
                                                            }
                                                        }}
                                                    >
                                                        {
                                                            (user.nickname || user.telephone) ?
                                                                `${index + 1}. ${user.nickname}：${user.telephone}`
                                                                :
                                                                `${index + 1}. 请该管理员设置用户名及其联系方式`
                                                        }
                                                    </Item>
                                                )
                                            }}
                                        </Mutation>
                                    )
                                }
                            </List>
                        )
                    }
                }
            </Query>
        )
    }
}

class StoreDetailFetch extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <Query query={gql(storebyprops)} variables={{}}>
                {
                    ({loading, error, data}) => {
                        if (loading) {
                            return (
                                <div className="loading">
                                    <div className="align">
                                        <ActivityIndicator text="Loading..." size="large"/>
                                    </div>
                                </div>
                            );
                        }

                        if (error) {
                            return 'error!';
                        }
                        let store, newStore;
                        let storeLength = data.storebyprops.length;
                        if (storeLength === 0) {
                            console.log('尚未个性化 store');
                            store = {};
                            newStore = true;
                        } else if (storeLength === 1) {
                            console.log('存在 store, update');
                            store = data.storebyprops[0];
                            newStore = false;
                        } else {
                            console.log('store 数据库出现错误');
                        }

                        let {name, description, address, alert, slideshow} = store;
                        return (
                            <StoreDetailRender
                                name={name}
                                description={description}
                                address={address}
                                alert={alert}
                                slideshow={slideshow}
                                newStore={newStore}
                            />
                        )
                    }
                }
            </Query>
        )
    }
}

class StoreDetailRender extends Component {
    // files 和 slideshow 无法处理
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            name: props.name,
            description: props.description,
            address: props.address,
            alert: props.alert,
            slideshow: props.slideshow,
            newStore: props.newStore
        }
    }

    // componentWillReceiveProps(next) {
    //     this.setState({
    //         newStore: next.newStore
    //     })
    // }

    onReset = () => {
        this.setState({
            files: [],
            name: '',
            description: '',
            address: '',
            alert: ''
        })
    };

    onChange = (files, type) => {
        console.log(files, type);
        this.setState({
            files,
        });
    };

    render() {
        let {files, name, description, address, alert, slideshow, newStore} = this.state;
        return (
            <List renderHeader={() => '店铺个性化管理'} className="my-list">
                <InputItem onChange={(e) => {
                    this.setState({name: e})
                }} value={name} placeholder="名称暂时不会显示">名称</InputItem>
                <InputItem onChange={(e) => {
                    this.setState({description: e})
                }} value={description} placeholder="简介暂时不会显示">简介</InputItem>
                <InputItem onChange={(e) => {
                    this.setState({address: e})
                }} value={address} placeholder="地址暂时不会显示">地址</InputItem>
                <InputItem onChange={(e) => {
                    this.setState({alert: e})
                }} value={alert} placeholder="通告会显示在用户界面的服务首页">通告</InputItem>
                <div className={'my-list-subtitle'}>页面轮播图（轮播图设置暂时无效）</div>
                <ImagePicker
                    files={files}
                    onChange={this.onChange}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={true}
                    multiple={false}
                />
                <Item>
                    {
                        newStore ?
                            <CreateStoreButton
                                img={files[0] ? files[0].url : ''}
                                name={name}
                                description={description}
                                address={address}
                                alert={alert}
                                slideshow={slideshow}
                            />
                            :
                            <UpdateStoreButton
                                img={files[0] ? files[0].url : ''}
                                name={name}
                                description={description}
                                address={address}
                                alert={alert}
                                slideshow={slideshow}
                            />
                    }
                    <Button size="small" inline style={{marginLeft: '2.5px'}} onClick={this.onReset}>重置</Button>
                </Item>
            </List>
        )
    }
}

class UpdateStoreButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {name, description, address, alert, slideshow, img} = this.props;
        return (
            <Mutation
                mutation={gql(updatestore)}
                refetchQueries={[{query: gql(storebyprops), variables: {}}]}
            >
                {(updatestore, {loading, error}) => {
                    if (loading)
                        return (
                            <div className="loading">
                                <div className="align">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            </div>
                        );
                    if (error)
                        return 'error';
                    let varObj = {
                        id: 'default store',
                        name,
                        description,
                        address,
                        alert,
                        slideshow,
                        updatedAt: new Date().getTime(),
                    };
                    return (
                        <Button type="primary" size="small" inline onClick={() => {
                            updatestore({variables: varObj})
                        }}>更新</Button>
                    )
                }}
            </Mutation>
        )
    }
}

class CreateStoreButton extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        let {name, description, address, alert, slideshow, img} = this.props;
        return (
            <Mutation
                mutation={gql(createstore)}
                refetchQueries={[{query: gql(storebyprops), variables: {}}]}
            >
                {(createstore, {loading, error}) => {
                    if (loading)
                        return (
                            <div className="loading">
                                <div className="align">
                                    <ActivityIndicator text="Loading..." size="large"/>
                                </div>
                            </div>
                        );
                    if (error)
                        return 'error';
                    let varObj = {
                        id: 'default store',
                        name: name ? name : '',
                        description: description ? description : '',
                        address: address ? address : '',
                        alert: alert ? alert : '',
                        slideshow: slideshow ? slideshow : [],
                        createdAt: new Date().getTime(),
                        updatedAt: ''
                    };
                    return (
                        <Button type="primary" size="small" inline onClick={() => {
                            createstore({variables: varObj})
                        }}>创建</Button>
                    )
                }}
            </Mutation>
        )
    }
}

