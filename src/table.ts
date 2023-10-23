type Row = Record<string, string | number | boolean>;

export type TableData = Array<Row>;

export class Table {
  private _columnMaxLength: Record<"keyWidth" | "valueWidth", number>;
  private _data: TableData;

  constructor(data: TableData) {
    this._data = data;
    this._columnMaxLength = {
      keyWidth: 0,
      valueWidth: 0,
    };
    this.getColumnsLength();
  }

  private getColumnsLength() {
    this._data.forEach((element) => {
      Object.keys(element).forEach((key) => {
        const value = element[key];
        if (this._columnMaxLength["keyWidth"] < key.length)
          this._columnMaxLength["keyWidth"] = key.length;
        //console.log("value.toString = " + value.toString() + "\tvalue.toString.length = " + value.toString().length);
        if (this._columnMaxLength["valueWidth"] < value.toString().length)
          this._columnMaxLength["valueWidth"] = value.toString().length;
      });
    });
  }

  print(): void {
    let str: string;
    let str2: string;

    //  Header of table
    str2 =
      String.fromCharCode(0x250c) +
      String.fromCharCode(0x2500).repeat(this._columnMaxLength["keyWidth"]) +
      String.fromCharCode(0x252c) +
      String.fromCharCode(0x2500).repeat(this._columnMaxLength["valueWidth"]) +
      String.fromCharCode(0x2510);
    console.log(str2);

    // Line between cells
    str2 =
      String.fromCharCode(0x251c) +
      String.fromCharCode(0x2500).repeat(this._columnMaxLength["keyWidth"]) +
      String.fromCharCode(0x253c) +
      String.fromCharCode(0x2500).repeat(this._columnMaxLength["valueWidth"]) +
      String.fromCharCode(0x2524);

    // Table
    this._data.forEach((element) => {
      console.log(str2);
      Object.keys(element).forEach((key) => {
        const value = element[key];

        str =
          String.fromCharCode(0x2502) +
          key.padEnd(this._columnMaxLength["keyWidth"]) +
          String.fromCharCode(0x2502) +
          value.toString().padEnd(this._columnMaxLength["valueWidth"]) +
          String.fromCharCode(0x2502);
        console.log(str);
      });
    });

    // Footer of table
    str2 =
      String.fromCharCode(0x2514) +
      String.fromCharCode(0x2500).repeat(this._columnMaxLength["keyWidth"]) +
      String.fromCharCode(0x2534) +
      String.fromCharCode(0x2500).repeat(this._columnMaxLength["valueWidth"]) +
      String.fromCharCode(0x2518);
    console.log(str2);
  }
}
