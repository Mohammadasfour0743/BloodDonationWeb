export const model = {
    username: "donor1",
    amountbloodL: 5,
    setL(number) {
        if (Number.isInteger(number) && number > 0) {
          this.amountbloodL = number
        } else {
          throw new Error("number of l")
        }
      }
}