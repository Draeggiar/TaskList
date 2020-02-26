using AutoMapper;
using NUnit.Framework;
using TaskList.Data.Models;

namespace TaskList.UnitTests.Data.Logic.TaskGroup
{
    [TestFixture]
    public class TaskGroupDbManagerTests
    {
        private IMapper _mapper;

        [SetUp]
        public void Init()
        {
            _mapper = new MapperConfiguration(cfg => { cfg.AddProfile(new MappingProfile()); }).CreateMapper();
        }

    }
}