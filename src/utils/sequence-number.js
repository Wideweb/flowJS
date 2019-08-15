class SequenceNumber {
    static next() {
        return SequenceNumber.index++;
    }
}

SequenceNumber.index = 0;

export default SequenceNumber