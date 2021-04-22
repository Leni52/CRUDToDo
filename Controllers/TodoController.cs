using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using TodoSample.Models;

namespace TodoSample.Controllers
{
    [Route("api/todo")]
    [ApiController]
    public class TodoController : ControllerBase
    {
        private static List<TodoItem> _itemList = new() { 
            new TodoItem { Id = 1, Title = "item 1", Closed = false }, 
            new TodoItem { Id = 2, Title = "item 2", Closed = false } 
        };


        // GET: api/todo  - READ
        [HttpGet]
        public List<TodoItem> Get()
        {
            return _itemList;
        }

        // GET api/todo/5  - READ
        [HttpGet("{id}")]
        public TodoItem Get(int id)
        {
            return _itemList.FirstOrDefault(i => i.Id == id);
        }

        // POST api/todo  - CREATE
        [HttpPost]
        public TodoItem Post(TodoItem item)
        {
            item.Id = _itemList.Count + 1;
            _itemList.Add(item);

            return item;
        }

        // PUT api/todo/5  - UPDATE
        [HttpPut("{id}")]
        public void Put(int id, TodoItem value)
        {
            TodoItem item = _itemList.FirstOrDefault(i => i.Id == id);
            if( item != null)
            {
                item.Title = value.Title;
                item.Closed = value.Closed;
            }
        }

        // DELETE api/todo/5  - DELETE
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _itemList.Remove(_itemList.FirstOrDefault(i => i.Id == id));
        }
    }
}
