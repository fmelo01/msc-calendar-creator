

export class DistinctDays {
  daysSet: Map<string, Date>;

  constructor(days?: Array<Date>) {
    this.daysSet = new Map<string, Date>();

    if (days) {
      days.forEach((day: Date) => this.add(day));
    }
  }

  add(date: Date): this {
    const dateKey = this.getUniqueDateKey(date);
    this.daysSet.set(dateKey, date);
    return this;
  }

  clear(): void {
    this.daysSet.clear();
  }

  delete(date: Date): boolean {
    const dateKey = this.getUniqueDateKey(date);
    return this.daysSet.delete(dateKey);
  }

  has(date: Date): boolean {
    const dateKey = this.getUniqueDateKey(date);
    return this.daysSet.has(dateKey);
  }

  values(): Array<Date> {
    return Array.from(this.daysSet.values());
  }

  get size(): number {
    return this.daysSet.size;
  }

  private getUniqueDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
  }

}
