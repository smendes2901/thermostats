module.exports = (acc, currRecord) => {
	const prevRecord = acc[acc.length - 1]
	if (typeof (prevRecord) === 'object' && currRecord.ts === prevRecord.ts) {
		acc[acc.length - 1] = {
			val: prevRecord.val + currRecord.val,
			ts: prevRecord.ts,
			count: prevRecord.count + 1
		}
		return acc
	} else {
		return [...acc, { ...currRecord, count: 1 }]
	}
}