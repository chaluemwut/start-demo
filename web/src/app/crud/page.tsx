'use client'

import { useEffect, useState } from "react"
import instance from "../config/config"
import { useRouter, useSearchParams } from 'next/navigation'
import moment from 'moment'

export default function Crud() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const userId = searchParams.get('id')

    useEffect(() => {
        // console.log('user id', userId)
        if (userId != null) {
            instance.get(`/users/${userId}`).then((res) => {
                setState({
                    ...res.data,
                    'birthDay': moment(res.data.birthDay).format('YYYY-MM-DD'),
                    'cardExpiredDate': moment(res.data.cardExpiredDate).format('YYYY-MM-DD')
                })
            })
        }
    }, [])

    const [state, setState] = useState({
        name: '',
        lastName: '',
        sex: '',
        birthDay: '',
        address: '',
        subdistrict: '',
        district: '',
        province: '',
        cardExpiredDate: ''
    })

    const handleInput = (e: any) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const onSave = async () => {
        console.log(state)
        if (userId == null) {
            await instance.post('/users', {
                "name": state.name,
                "lastName": state.lastName,
                "sex": state.sex,
                "birthDay": state.birthDay,
                "address": state.address,
                "subdistrict": state.subdistrict,
                "district": state.district,
                "province": state.province,
                "cardExpiredDate": state.cardExpiredDate
            })
        } else {
            await instance.patch('/users', {
                "id": Number(userId),
                "name": state.name,
                "lastName": state.lastName,
                "sex": state.sex,
                "birthDay": state.birthDay,
                "address": state.address,
                "subdistrict": state.subdistrict,
                "district": state.district,
                "province": state.province,
                "cardExpiredDate": state.cardExpiredDate
            })
        }
        router.replace("/")
    }

    const onDelete = async () => {
        await instance.delete(`/users/${userId}`)
        router.replace("/")
    }

    return (<div style={{ marginLeft: '5%', marginRight: '5%' }}>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <h2>เพิ่มพนักงาน</h2>
        </div>
        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="ชื่อ"
                name="name"
                value={state.name}
                onChange={handleInput}
                className="form-control" />
        </div>

        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="นามสกุล"
                name="lastName"
                value={state.lastName}
                onChange={handleInput}
                className="form-control"
            />
        </div>

        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="เพศ"
                name="sex"
                value={state.sex}
                onChange={handleInput}
                className="form-control"
            />
        </div>

        <div style={{ marginTop: '10px' }}>
            <label className="form-label">วันเดือนปีเกิด</label>
            <input type="date"
                className="form-control"
                value={state.birthDay}
                name="birthDay"
                onChange={handleInput} />
        </div>

        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="ที่อยุ่"
                name="address"
                value={state.address}
                onChange={handleInput}
                className="form-control"
            />
        </div>

        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="ตำบล"
                name="subdistrict"
                value={state.subdistrict}
                onChange={handleInput}
                className="form-control"
            />
        </div>

        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="อำเภอ"
                name="district"
                value={state.district}
                onChange={handleInput}
                className="form-control"
            />
        </div>

        <div style={{ marginTop: '10px' }}>
            <input type="text" placeholder="จังหวัด"
                name="province"
                value={state.province}
                onChange={handleInput}
                className="form-control"
            />
        </div>

        <div style={{ marginTop: '10px' }}>
            <label className="form-label">วันที่บัตรประชาชนหมดอายุ</label>
            <input type="date"
                className="form-control"
                value={state.cardExpiredDate}
                name="cardExpiredDate"
                onChange={handleInput} />
        </div>

        <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <button className="btn btn-primary" onClick={onSave}>บันทึก</button>
            {userId != null && (<button style={{ marginLeft: '10px' }} className="btn btn-danger" onClick={onDelete}>ลบ</button>)}
        </div>
    </div>)
}