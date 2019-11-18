<template>
  <div>
    <v-toolbar primary dark>
      <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon dark>
        <v-icon>mdi-logout</v-icon>
        <span class="icon-text">ログアウト</span>
      </v-btn>
    </v-toolbar>
    <template>
      <v-tabs fixed-tabs >
        <v-tab 
          v-for="item in tabItems"
          :key="item"
          @click="tab = item"
        >{{ item }}
        </v-tab>
      </v-tabs>
    </template>
    <v-container>
      <div v-if="tab =='todo'">
        <ul class="listBar">
          <li v-for="post in posts" :key="post.id" :v-if = "post.completed = false">
            <div class="list-checkbox">
              <input
                type="checkbox"
                :id="post.id"
                v-model="post.completed"
                @input="completedTodo(post.id)"
              >
              <label class="title-text" :for="post.id">{{ post.title }}</label>
            </div>
            <div class="right-content">
              <span class="point-text">{{ post.point }} pt</span>
              <button class="delete-btn" @click="deleteDialog(post.id, post.title)">
                <i class="material-icons">delete</i>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else-if="tab =='reward'">
        <ul class="listBar">
          <li v-for="reward in rewards" :key="reward.id">
            <div class="list-checkbox">
              <button class="get-reward-btn" @click="getRewardDialog(reward.id, reward.title, reward.point)">
                <v-icon>add_shopping_carts</v-icon>
              </button>
              <label class="title-text" :for="reward.id">{{ reward.title }}</label>
            </div>
            <div class="right-content">
              <span class="point-text">{{ reward.point }} pt</span>
              <button class="delete-btn" @click="deleteDialog(reward.id, reward.title)">
                <i class="material-icons">delete</i>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </v-container>
    <v-fab-transition>
      <v-btn
        :key="activeFab.icon"
        :color="activeFab.color"
        fab
        dark
        class="floating-action-botton"
        @click.stop="dialog.add = true"
      >
        <v-icon>{{ activeFab.icon }}</v-icon>
      </v-btn>
    </v-fab-transition>

    <!-- ▼ dialog.add -->
    <v-dialog
      v-model="dialog.add"
      max-width="290"
    >
      <v-card v-if="tab =='todo'">
        <v-card-title>新しいTODOの追加</v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="created.post.title"
            type="text"
            label="TODOのタイトル"
            required
          ></v-text-field>
          <v-text-field
            v-model="created.post.point"
            type="number"
            label="TODOのポイント"
            required
          ></v-text-field>
        </v-container>
        <v-card-actions>
        <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="createPost(1)">追加する</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="tab =='reward'">
        <v-card-title>新しいご褒美の追加</v-card-title>
        <v-divider></v-divider>
        <v-container>
          <v-text-field
            v-model="created.reward.title"
            type="text"
            label="ご褒美のタイトル"
            required
          ></v-text-field>
          <v-text-field
            v-model="created.reward.point"
            type="number"
            label="ご褒美のポイント"
            required
          ></v-text-field>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="createReward(1)">追加する</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ▲ dialog.add -->
    
    <!-- ▼ dialog.delete -->
    <v-dialog
      v-model="dialog.delete.modal"
      max-width="290"
    >
      <v-card v-if="tab =='todo'">
        <v-container>
          {{dialog.delete.title}} を本当に消してもよろしいですか？
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.delete.modal = false">いいえ</v-btn>
          <v-btn color="red darken-1" text @click="deletePost(dialog.delete.id)">はい</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="tab =='reward'">
        <v-container>
          {{dialog.delete.title}} を本当に消してもよろしいですか？
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.delete.modal = false">いいえ</v-btn>
          <v-btn color="red darken-1" text @click="deleteReward(dialog.delete.id)">はい</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- ▲ dialog.delete -->

    <!-- ▼ dialog.delete -->
    <v-dialog
      v-model="dialog.getReward.modal"
      max-width="290"
    >
      <v-card>
        <v-container>
          {{dialog.getReward.point}}ptを使って、{{dialog.getReward.title}} のご褒美を手にいれますか？
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog.getReward.modal = false">いいえ</v-btn>
          <v-btn color="red darken-1" text @click="getReward(dialog.getReward.id)">はい</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tabItems: ['todo', 'reward'],
      tab: 'todo',
      posts: [],
      rewards: [],
      users: [],
      headerTitle: 'こんにちは',
      dialog: {
        add: false,
        delete: {
          modal: false,
          id: '',
          title: ''
        },
        getReward: {
          modal: false,
          id: '',
          point: '',
          title: ''
        }
      },
      created: {
        post: {
          title: '',
          point: ''
        },
        reward: {
          title: '',
          point: ''
        }
      },
    }
  },
  created() {
    axios
      .get('https://todo-shop-api.herokuapp.com/api/v1/users')
      .then(response => {
        this.users = response.data.data
        this.headerTitle = `所持ポイント : ${this.users[3].point}pt`
      });
    axios
      .get('https://todo-shop-api.herokuapp.com/api/v1/posts')
      .then(response => {
        this.posts = response.data.data
      });
    axios
      .get('https://todo-shop-api.herokuapp.com/api/v1/rewards')
      .then(response => {
        this.rewards = response.data.data
      });
  },
  computed: {
    activeFab () {
      switch (this.tab) {
        case 'todo': return { color: 'success', icon: 'playlist_add' }
        case 'reward': return { color: 'red', icon: 'add'}
        default: return {}
      }
    },
  },
  methods: {
    deleteDialog(id, title) {
      this.dialog.delete.modal = true;
      this.dialog.delete.id = id;
      this.dialog.delete.title = title;
    },
    getRewardDialog(id, title, point) {
      this.dialog.getReward.modal = true;
      this.dialog.getReward.id = id;
      this.dialog.getReward.point = point;
      this.dialog.getReward.title = title;
    },
    deletePost(id) {
      axios.delete(`https://todo-shop-api.herokuapp.com/api/v1/posts/${id}`)
        .then(response => {
          alert("TODOを削除しました");
          this.getPosts();
          this.dialog.delete.modal = false;
        });
    },
    deleteReward (id) {
      axios
        .delete(`https://todo-shop-api.herokuapp.com/api/v1/rewards/${id}`)
        .then(response => {
          alert("ご褒美を削除しました");
          this.getRewards();
          this.dialog.delete.modal = false;
        });
    },
    getPosts() {
      axios
        .get('https://todo-shop-api.herokuapp.com/api/v1/posts')
        .then(response => {
          this.posts = response.data.data
        });
    },
    getRewards() {
      axios
        .get('https://todo-shop-api.herokuapp.com/api/v1/rewards')
        .then(response => {
          this.rewards = response.data.data
      });
    },
    createPost(userId) {
      axios
        .post('https://todo-shop-api.herokuapp.com/api/v1/posts',
          {
            "title": this.created.post.title,
            "user_id" : userId,
            "point": this.created.post.point,
          }
        )
        .then(response => {
          alert('新しいTODOを作成しました');
          this.dialog.add = false;
          this.getPosts();
        })
    },
    createReward(userId) {
      axios
        .post('https://todo-shop-api.herokuapp.com/api/v1/rewards',
          {
            "title": this.created.reward.title,
            "user_id" : userId,
            "point": this.created.reward.point,
          }
        )
        .then(response => {
          alert('新しいご褒美を作成しました');
          this.dialog.add = false;
          this.getRewards();
        })
    },
    reloadUser(){
      axios
      .get('https://todo-shop-api.herokuapp.com/api/v1/users')
      .then(response => {
        this.users = response.data.data
        this.headerTitle = `所持ポイント : ${this.users[3].point}pt`
      });

      console.log(this.users);
    },
    completedTodo(id) {
      axios
        .post('https://todo-shop-api.herokuapp.com/api/v1/posts/complete',
          {
            id: id
          }
        )
        .then(response => {
          alert(`TODO達成！${response.data.data.poin}pt獲得！`);
          this.reloadUser();
          this.getPosts();
        })
    },
    getReward(id) {
      axios
        .post('https://todo-shop-api.herokuapp.com/api/v1/rewards/getReward',
          {
            id: id
          }
        )
        .then(response => {
          alert(`ご褒美${response.data.data.title}をもらいました！大事に使おう！`);
          this.reloadUser();
          this.getRewards();
          this.dialog.getReward.modal = false
        })
    },
  }
}
</script>

<style scoped>
>>> .theme--light.v-application {
  background-color: #f3f3f3;
}

>>> .v-toolbar {
  position: fixed;
  width: 100%;
  height: 56px;
  z-index: 5;
}

>>> .v-tabs {
  position: fixed;
  top: 56px;
  width: 100%;
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.08);
  z-index: 5;
}

>>> .v-toolbar__content {
  background-color: #1976D2;
}

>>> .v-toolbar__title {
  font-size: 14px;
}

>>> .v-btn__content {
  flex-direction: column !important;
}

>>> .v-btn {
  margin-right: -4px !important;
}

.icon-text {
  font-weight: bold;
  font-size: 10px;
  letter-spacing: -0.2px;
}
</style>

<style lang="scss">
.icon-text {
  font-weight: bold;
  font-size: 10px;
  letter-spacing: -0.2px;
}

.listBar {
  padding-left: 0!important;
  padding-top: 120px;
  list-style: none;

  li {
    position: relative;
    background-color: #fff;
    padding: 10px 15px;
    border-radius: 4px;
    box-shadow: 0px 4px 6px -2px rgba(0, 0, 0, 0.08);
    display: flex;
    justify-content: space-between;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

.list-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  
  input[type = "checkbox"] {
    visibility: hidden;
    width: 24px;
    height: 24px;

    &::before {
      visibility: visible;
      display: block;
      font-size: 20px;
      line-height: 24px;
    }

    &:not(:checked) {
      &::before {
        font-family: 'Material Icons';
        content: "\e835";
      }
    }

    &:checked {
      &::before {
        font-family: 'Material Icons';
        content: "\e834";
      }

      & + label {
        text-decoration: line-through;
      }
    }
  }
}

.right-content {
  display: flex;
  align-items: center;
}

.title-text {
  font-size: 18px;
  line-height: 24px;
  padding: 0 10px;
}

.point-text {
  font-size: 12px;
  color: #888;
  line-height: 24px;
}

.delete-btn {
  width: 24px;
  height: 24px;
  border-radius: 12px;
  margin-left: 15px;
  background-color: #f1f1f1;

  i {
  font-size: 16px;
  line-height: 24px;
  color:  #888;
  }
}

.floating-action-botton {
  position: fixed;
  right: 12px;
  bottom: 12px;
}

.get-reward-btn {
  width: 24px;
  height: 24px;
  margin-right: 4px;
}
</style>