// 注意是否使用 gql
// apollo client 需要使用 gql
// graphql-request 不需要使用 gql
// import gql from "graphql-tag";

const serverbyprops = `
    query serverbyprops($name: String, $description: String, $img: String, $createdAt: String, $updatedAt: String) {
      serverbyprops: server_by_props(name: $name description: $description img: $img createdAt: $createdAt updatedAt: $updatedAt) {
        id
        name
        description
        img
        createdAt
        updatedAt
      }
    }
`;

const servicebyprops = `
    query servicebyprops($server_id: ID) {
      servicebyprops: service_by_props(server_id: $server_id) {
        id
        server_id {
          id
          name
          description
          img
          createdAt
          updatedAt
        }
        repertory_id {
          id
          count
          createdAt
          updatedAt
        }
        description
        price
        startTime
        lastTime
      }
    }
`;

const orderbyprops = `
    query orderbyprops($orderStatus: String, $user_id: ID) {
      orderbyprops: order_by_props(orderStatus: $orderStatus user_id: $user_id) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        contactTelephone
        contactName
        user_id {
          id
          openid
          admin
          username
          nickname
          password
          telephone
          email
          createdAt
          updatedAt
        }
        service_id {
          id
          description
          price
          startTime
          lastTime
          createdAt
          updatedAt
          repertory_id {
              id
              count
              createdAt
              updatedAt
            }
          server_id {
              id
              name
              description
              img
              createdAt
              updatedAt
           }
        }
        customerNumber
      }
    }
`;

const userbyid = `
    query userbyid($id: ID) {
      userbyid: user_by_id(id: $id) {
        id
        openid
        admin
        username
        nickname
        password
        telephone
        email
        createdAt
        updatedAt
      }
    }
`;

const userbyprops = `
    query userbyprops($email: String, $updatedAt: String, $admin: String, $password: String, $telephone: String, $nickname: String, $username: String, $createdAt: String, $openid: String) {
      userbyprops: user_by_props(email: $email updatedAt: $updatedAt admin: $admin password: $password telephone: $telephone nickname: $nickname username: $username createdAt: $createdAt openid: $openid) {
        email
        updatedAt
        admin
        password
        telephone
        nickname
        username
        createdAt
        openid
        id
      }
    }
`;

const updateuser = `
    mutation updateuser($id: ID, $nickname: String, $telephone: String, $updatedAt: String) {
      updateuser: update_user(id: $id nickname: $nickname  telephone: $telephone updatedAt: $updatedAt) {
        id
        openid
        admin
        username
        nickname
        password
        telephone
        email
        createdAt
        updatedAt
      }
    }

`;
const createuser = `
    mutation createuser($email: String, $updatedAt: String, $admin: String, $password: String, $telephone: String, $nickname: String, $username: String, $createdAt: String, $openid: String, $id: ID!) {
      createuser: create_user(email: $email updatedAt: $updatedAt admin: $admin password: $password telephone: $telephone nickname: $nickname username: $username createdAt: $createdAt openid: $openid id: $id) {
        email
        updatedAt
        admin
        password
        telephone
        nickname
        username
        createdAt
        openid
        id
      }
    }
`;

const updateorderAndupdaterepertory = `
    mutation updateorderAndupdaterepertory ($order_id: ID, $repertory_id: ID, $updatedAt: String, $orderStatus: String, $count: Int) {
      updateorder: update_order(id: $order_id updatedAt: $updatedAt orderStatus: $orderStatus) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        customerNumber
      }
      
      updaterepertory: update_repertory(id: $repertory_id count: $count updatedAt: $updatedAt) {
        id
        count
        updatedAt
      }
    }
`;

const createorderAndupdaterepertory = `
    mutation updateorderAndupdaterepertory ($order_id: ID!, $contactTelephone: String, $contactName: String, $payStatus: String, $remark: String, $payCount: String, $payTime: String, $createdAt: String, $orderStatus: String, $user_id: ID, $service_id: ID, $customerNumber: Int, $repertory_id: ID, $updatedAt: String, $count: Int) {
        createorder: create_order(id: $order_id contactTelephone: $contactTelephone contactName: $contactName payStatus: $payStatus remark: $remark payCount: $payCount createdAt: $createdAt updatedAt: $updatedAt payTime: $payTime createdAt: $createdAt orderStatus: $orderStatus user_id: $user_id service_id: $service_id customerNumber: $customerNumber) {
            payStatus
            remark
            payCount
            updatedAt
            payTime
            createdAt
            updatedAt
            orderStatus
            id
            customerNumber
            contactTelephone
            contactName
          }
      
          updaterepertory: update_repertory(id: $repertory_id count: $count updatedAt: $updatedAt) {
            id
            count
            updatedAt
          }
    }
`;

const createorderAndupdaterepertoryAndupdateuser = `
    mutation createorderAndupdaterepertoryAndupdateuser ($order_id: ID!, $user_id: ID!, $nickname: String, $telephone: String, $contactTelephone: String, $contactName: String, $payStatus: String, $remark: String, $payCount: String, $payTime: String, $createdAt: String, $orderStatus: String, $user_id: ID, $service_id: ID, $customerNumber: Int, $repertory_id: ID, $updatedAt: String, $count: Int) {
        createorder: create_order(id: $order_id contactTelephone: $contactTelephone contactName: $contactName payStatus: $payStatus remark: $remark payCount: $payCount createdAt: $createdAt updatedAt: $updatedAt payTime: $payTime createdAt: $createdAt orderStatus: $orderStatus user_id: $user_id service_id: $service_id customerNumber: $customerNumber) {
            payStatus
            remark
            payCount
            updatedAt
            payTime
            createdAt
            updatedAt
            orderStatus
            id
            customerNumber
            contactTelephone
            contactName
          }
      
          updaterepertory: update_repertory(id: $repertory_id count: $count updatedAt: $updatedAt) {
            id
            count
            updatedAt
          }
          
          
        updateuser: update_user(id: $user_id nickname: $contactName  telephone: $contactTelephone updatedAt: $updatedAt) {
            id
            openid
            admin
            username
            nickname
            password
            telephone
            email
            createdAt
            updatedAt
        }
        
    }
`;

const repertorybyid = `
    query repertorybyid($id: ID) {
      repertorybyid: repertory_by_id(id: $id) {
        id
        count
        createdAt
        updatedAt
      }
    }
`;

const deleteorder = `
    mutation deleteorder($id: ID, $user_id: ID) {
      deleteorder: delete_order(id: $id user_id: $user_id)
    }
`;

const updateorder = `
    mutation updateorder($updatedAt: String, $orderStatus: String, $id: ID, $user_id: ID) {
      updateorder: update_order(updatedAt: $updatedAt orderStatus: $orderStatus id: $id user_id: $user_id ) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        customerNumber
      }
    }
`;

const adminorderbyprops = `
    query orderbyprops($orderStatus: String) {
      orderbyprops: order_by_props(orderStatus: $orderStatus) {
        payStatus
        remark
        payCount
        updatedAt
        payTime
        createdAt
        orderStatus
        id
        contactTelephone
        contactName
        user_id {
          id
          openid
          admin
          username
          nickname
          password
          telephone
          email
          createdAt
          updatedAt
        }
        service_id {
          id
          description
          price
          startTime
          lastTime
          createdAt
          updatedAt
          repertory_id {
              id
              count
              createdAt
              updatedAt
            }
          server_id {
              id
              name
              description
              img
              createdAt
              updatedAt
           }
        }
        customerNumber
      }
    }
`;

const createserver = `
    mutation createserver($id: ID!, $name: String, $description: String, $img: String, $createdAt: String, $updatedAt: String) {
      createserver: create_server(id: $id name: $name description: $description img: $img createdAt: $createdAt updatedAt: $updatedAt) {
        id
        name
        description
        img
        createdAt
        updatedAt
      }
    }
`;

const servicebyid = `
    query servicebyid($id: ID) {
      servicebyid: service_by_id(id: $id) {
        id
        server_id {
          id
          name
          description
          img
          createdAt
          updatedAt
        }
        repertory_id {
          id
          count
          createdAt
          updatedAt
        }
        description
        price
        startTime
        lastTime
        createdAt
        updatedAt
      }
    }
`;

const updateserviceAndupdaterepertory = `
    mutation createserviceAndcreaterepertory($service_id: ID, $server_id: ID, $repertory_id: ID!, $count: Int, $description: String, $price: Float, $startTime: String, $lastTime: String, $updatedAt: String) {
      updateservice: update_service(id: $service_id server_id: $server_id repertory_id: $repertory_id description: $description price: $price startTime: $startTime lastTime: $lastTime updatedAt: $updatedAt) {
        id
        description
        price
        startTime
        lastTime
        createdAt
        updatedAt
      }
      
      updaterepertory: update_repertory(id: $repertory_id service_id: $service_id count: $count updatedAt: $updatedAt) {
        id
        count
        createdAt
        updatedAt
      }
    }
`;

const createserviceAndcreaterepertory = `
    mutation createserviceAndcreaterepertory($service_id: ID!, $server_id: ID, $repertory_id: ID!, $count: Int, $description: String, $price: Float, $startTime: String, $lastTime: String, $createdAt: String, $updatedAt: String) {
      createservice: create_service(id: $service_id server_id: $server_id repertory_id: $repertory_id description: $description price: $price startTime: $startTime lastTime: $lastTime createdAt: $createdAt updatedAt: $updatedAt) {
        id
        description
        price
        startTime
        lastTime
        createdAt
        updatedAt
      }
      
      createrepertory: create_repertory(id: $repertory_id service_id: $service_id count: $count createdAt: $createdAt updatedAt: $updatedAt) {
        id
        count
        createdAt
        updatedAt
      }
    }
`;

const deleteserviceAnddeleterepertory = `
    mutation deleteserviceAnddeleterepertory($repertory_id: ID!, $service_id: ID!) {
      deleterepertory: delete_repertory(id: $repertory_id)
      
      deleteservice: delete_service(id: $service_id)
    }
`;

export {
    servicebyid,
    serverbyprops,
    servicebyprops,
    orderbyprops,
    adminorderbyprops,
    userbyid,
    userbyprops,
    updateuser,
    createuser,
    repertorybyid,
    updateorderAndupdaterepertory,
    createorderAndupdaterepertory,
    deleteorder,
    updateorder,
    createserver,
    updateserviceAndupdaterepertory,
    createserviceAndcreaterepertory,
    deleteserviceAnddeleterepertory,
    createorderAndupdaterepertoryAndupdateuser
}