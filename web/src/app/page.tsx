'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import instance from "./config/config";
import moment from 'moment'

export default function Home() {
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [month, setMonth] = useState(0)
  const [isCardExpired, setCardExpired] = useState(false)

  useEffect(() => {
    instance.get("/users").then((res) => {
      console.log('res', res)
      setUsers(res.data)
      console.log(res.data[0]['name'])
    })
  }, [])

  const formatDate: any = (inDate: any) => {
    return moment(new Date(inDate)).format('DD-MM-YYYY')
  }

  const onChangeMonth = (e: any) => {
    setMonth(e.target.value)
  }

  const onChangeCardExpired = (e: any) => {
    console.log('e', e.target.checked)
    setCardExpired(e.target.checked)
  }

  const onSearch = async () => {
    const res = await instance.get(`/users/${month}/${isCardExpired}`)
    console.log('res', res.data)
    setUsers(res.data)
  }

  return (<div style={{ marginLeft: '1%', marginRight: '1%' }}>
    <div style={{ textAlign: 'center', marginTop: '10px', marginBottom: '10px' }}>
      <button className="btn btn-primary" onClick={() => {
        router.push('/crud')
      }}>add</button>
    </div>
    <div>
      <div>ตัวกรอง</div>
      <div className="col-4" style={{ marginTop: '10px' }}>
        <select className="form-select" onChange={onChangeMonth} value={month}>
          <option value={0}>เลือกเดือน</option>
          <option value={1}>มกราคม</option>
          <option value={2}>กุมภาพันธ์</option>
          <option value={3}>มีนาคม</option>
          <option value={4}>เมษายน</option>
          <option value={5}>พฤษภาคม</option>
          <option value={6}>มิถุนายน</option>
          <option value={7}>กรกฎาคม</option>
          <option value={8}>สิงหาคม</option>
          <option value={9}>กันยายน</option>
          <option value={10}>ตุลาคม</option>
          <option value={11}>พฤศจิกายน</option>
          <option value={12}>ธันวาคม</option>
        </select>
      </div>
      <div className="form-check" style={{ marginTop: '10px' }}>
        <input className="form-check-input"
          type="checkbox"
          onChange={onChangeCardExpired} />
        <label className="form-check-label">
          เฉพาะคนที่บัตรประชาชนหมดอายุ
        </label>
      </div>
      <div style={{ marginTop: '10px' }}>
        <button className="btn btn-outline-success" onClick={onSearch}>Serach</button>
      </div>
    </div>
    <div style={{ marginTop: '10px' }}>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ชื่อ</th>
            <th scope="col">นามสกุล</th>
            <th scope="col">เพศ</th>
            <th scope="col">วันเดือนปีเกิด</th>
            <th scope="col">ที่อยุ่</th>
            <th scope="col">ตำบล</th>
            <th scope="col">อำเภอ</th>
            <th scope="col">จังหวัด</th>
            <th scope="col">วันที่บัตรประชาชนหมดอายุ</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 && users.map((e) => (<tr>
            <td>{e['id']}</td>
            <td>{e['name']}</td>
            <td>{e['lastName']}</td>
            <td>{e['sex']}</td>
            <td>{formatDate(e['birthDay'])}</td>
            <td>{e['address']}</td>
            <td>{e['subdistrict']}</td>
            <td>{e['district']}</td>
            <td>{e['province']}</td>
            <td>{formatDate(e['cardExpiredDate'])}</td>
            <td><button className="btn btn-outline-dark" onClick={()=>{
              console.log(e)
              router.push(`/crud?id=${e['id']}`)
            }}>เลือก</button></td>
          </tr>))
          }
        </tbody>
      </table>

    </div>
  </div>
  );
}
