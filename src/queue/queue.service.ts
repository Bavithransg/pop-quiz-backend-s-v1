import { Injectable } from '@nestjs/common';

@Injectable()
export class QueueService {
    //priority queue
    items: any;
    constructor() {
        this.items = [];
      }  
      
      enqueue(element, priority) {
        const queueElement = { element, priority };
        let isInserted = false;
    
        for (let i = 0; i < this.items.length; i++) {
          if (queueElement.priority < this.items[i].priority) {
            this.items.splice(i, 0, queueElement);
            isInserted = true;
            break;
          }
        }
        if (!isInserted) {
            this.items.push(queueElement);
          }
        }
          // Returns true if Array is Empty

          isEmpty() {
            return this.items.length === 0;
          }
        
          // Get the number of elements in the priority queue
          size() {
            return this.items.length;
          }
        
          // Get the element with the highest priority without removing it
          peek() {
            if (this.isEmpty()) {
              return null;
            }
            return this.items[0].element;
          }
    
          // Get the element with the highest priority with removing it

          pop(){
            if (this.isEmpty()) {
                return null;
              }
              return this.items.shift().element;
          }
}