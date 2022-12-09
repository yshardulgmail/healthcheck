const ApplicationsTable = () => {
    return (
        <table border="1">
            <tr>
                <th>Application</th>
                <th>Up Time</th>
                <th>Down Time</th>
            </tr>
            <tr>
                <td><a href="https://www.google.com">Application1</a></td>
                <td>20 mins</td>
                <td>2 mins</td>
            </tr>
            <tr>
                <td><a href="https://www.facebook.com">Application2</a></td>
                <td>124 mins</td>
                <td>6 mins</td>
            </tr>
        </table>
    );
}

export default ApplicationsTable;