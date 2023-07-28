import React from 'react'
import '../styles/Report.css'

const ReportGeneration = () => {
  return (
    <>
    <div className='report-container'>
        <h2>Day By Day Expenses</h2>
        <table className='report-tabel'>
        <tbody>
            <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Income</th>
                <th>Expense</th>
            </tr>
            <tr>
                <td>15-07-1995</td>
                <td>This a failure</td>
                <td>birth</td>
                <td>3-000</td>
                <td>39</td>
            </tr>
        </tbody>
        </table>
    </div>
    <div className='report-container'>
        <h2>Yearly Report</h2>
        <table className='report-tabel'>
        <tbody>
            <tr>
                <th>Month</th>
                <th>Income</th>
                <th>Expenses</th>
                <th>Savings</th>
                
            </tr>
            <tr>
                <td>15-07-1995</td>
                <td>This a failure</td>
                <td>birth</td>
                <td>3-000</td>
             
            </tr>
        </tbody>
        </table>
    </div>
    </>
  )
}

export default ReportGeneration