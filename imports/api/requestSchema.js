export const RequestSchema = newSimpleSchema({
    "weekStart": {
        type: Date,
        label: "Week Start Date"
    },
    "created": {
        type: Date,
        label: "Schedule Made at",
        autovalue: function() {
            if (this.isInsert) {
                return new Date;
            }
        }
    },
    /*--------------- Mon Day shift-----------------*/
    "monOne.$._id": {
        type: String,
        label: "request id"
    },
    "monOne.$.company": {
      type: String,
      label: "company name"
    },
    "monOne.$.createdAt": {
      type: Date,
      label: "request created at"
    },
    "monOne.$.order": {
      type: Number,
      label: "order added"
    },
    "monOne.$.owner": {
      type: String,
      label:"owner id"
    },
    "monOne.$.username": {
      type: String,
      label:"Usename"
    },
    /*--------------- Mon Night shift-----------------*/
    "monTwo.$._id": {
        type: String,
        label: "request id"
    },
    "monTwo.$.company": {
      type: String,
      label: "company name"
    },
    "monTwo.$.createdAt": {
      type: Date,
      label: "request created at"
    },
    "monTwo.$.order": {
      type: Number,
      label: "order added"
    },
    "monTwo.$.owner": {
      type: String,
      label:"owner id"
    },
    "monTwo.$.checked": {
      type: Boolean,
      label:"working three shift"
    },
    "monTwo.$.username": {
      type: String,
      label:"Usename"
    },
});
