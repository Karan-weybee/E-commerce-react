import React, { useEffect, useState } from 'react';
import { fs } from '../Config/Config';
import { getDoc, doc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import '../css/Orders.scss'
import { useNavigate } from 'react-router-dom';

const Orders = () => {

    const inputDateString = 'Thu Feb 02 2024 17:00:17 GMT+0530 (India Standard Time)';

    const getOrdinalSuffix = (number) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const v = number % 100;
        return (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'long' });
        const year = date.getFullYear();
        const hours = date.getHours() >= 12 ? date.getHours() - 12 : date.getHours();
        const minutes = date.getMinutes();
        const period = date.getHours() >= 12 ? 'pm' : 'am';

        const formattedDate = `${day}${getOrdinalSuffix(day)} ${month} ${year} ${hours}:${minutes.toString().padStart(2, '0')} ${period}`;

        return formattedDate;
    };

    String.prototype.hashCode = function() {
        var hash = 0,
          i, chr;
        if (this.length === 0) return hash;
        for (i = 0; i < 5; i++) {
          chr = this.charCodeAt(i);
          hash = ((hash << 5) - hash) + chr;
          hash |= 0; // Convert to 32-bit integer
        }
        return Math.abs(hash) % 100000; // Limit to 5 digits
      }
      
      


    const nevigate = useNavigate();
    const user = useSelector((state) => state.userSlice.user);
    const [orderList, setOrderList] = useState([]);
    console.log(orderList)

    async function getOrderData() {
        setOrderList([])
        var orders=[];
        await getDoc(doc(fs, `user-orders`, `${user}`)).then((doc) => {
            if (doc.exists()) {
                console.log(doc.data())
                orders = doc.data().orders;
            }
        })

        
        orders.map(async (order) => {
            await getDoc(doc(fs, `orders`, `${order}`)).then((doc) => {
                if (doc.exists()) {
                    console.log(doc.data().date)
                    var total = 0;
                    doc.data().products.map((product) => {
                        total = total + product.total
                    })

                    setOrderList((orderlist => [...orderlist, { 'orderId': order, 'date': formatDate(new Date(doc.data().date)), 'total': total }]))
                }
            })
        })

    }

    useEffect(() => {
        getOrderData();
    }, [user])
    return (
        <div className='order-section container'>

            <table style={{ width: '100%' }}>
                <tr>
                    <th> Order Id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th className='view'>View</th>
                </tr>

                {orderList && orderList.map((orderlist) => (
                    <tr key={orderlist.orderId}>
                        <td>{orderlist.orderId.hashCode()}</td>
                        <td>{orderlist.date}</td>
                        <td>{orderlist.total}</td>
                        <td><button onClick={()=>{nevigate(`/order/${orderlist.orderId}`)}}>Details</button></td>
                    </tr>
                ))}

            </table>

        </div>
    );
}

export default Orders;
