export function generateSeatMap(rows, capacity) {
    const seatsPerRow = Math.floor(capacity / rows.length);
    const seatMap = [];

    for (const row of rows) {
        for (let i = 1; i <= seatsPerRow; i++) {
            seatMap.push({
                seatId: `${row}${i}`,
                booked: false
            })
        }

    }

    return seatMap;
}