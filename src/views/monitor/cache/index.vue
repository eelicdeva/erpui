<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24" class="card-box">
        <el-card>
          <template #header><span>基本信息</span></template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <table cellspacing="0" style="width: 100%">
              <tbody>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">Redis版本</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.redis_version }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">运行模式</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.redis_mode == "standalone" ? "单机" : "集群" }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">端口</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.tcp_port }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">客户端数</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.connected_clients }}</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">运行时间(天)</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.uptime_in_days }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">使用内存</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.used_memory_human }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">使用CPU</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ parseFloat(cache.info.used_cpu_user_children).toFixed(2) }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">内存配置</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.maxmemory_human }}</div></td>
                </tr>
                <tr>
                  <td class="el-table__cell is-leaf"><div class="cell">AOF是否开启</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.aof_enabled == "0" ? "否" : "是" }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">RDB是否成功</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.rdb_last_bgsave_status }}</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">Key数量</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.dbSize">{{ cache.dbSize }} </div></td>
                  <td class="el-table__cell is-leaf"><div class="cell">网络入口/出口</div></td>
                  <td class="el-table__cell is-leaf"><div class="cell" v-if="cache.info">{{ cache.info.instantaneous_input_kbps }}kps/{{cache.info.instantaneous_output_kbps}}kps</div></td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <template #header><span>命令统计</span></template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="commandstats" style="height: 420px" />
          </div>
        </el-card>
      </el-col>

      <el-col :span="12" class="card-box">
        <el-card>
          <template #header>
            <span>内存信息</span>
          </template>
          <div class="el-table el-table--enable-row-hover el-table--medium">
            <div ref="usedmemory" style="height: 420px" />
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup name="Cache">
import { getCache } from '@/api/monitor/cache';
import * as echarts from 'echarts';
import { ComponentInternalInstance, getCurrentInstance, ref } from "vue";

interface CommandStats {
  name: string
  value: string
}

interface Info {
active_defrag_hits: string
active_defrag_key_hits: string
active_defrag_key_misses: string
active_defrag_misses: string
active_defrag_running: string
allocator_active: string
allocator_allocated: string
allocator_frag_bytes: string
allocator_frag_ratio: string
allocator_resident: string
allocator_rss_bytes: string
allocator_rss_ratio: string
aof_current_rewrite_time_sec: string
aof_enabled: string
aof_last_bgrewrite_status: string
aof_last_cow_size: string
aof_last_rewrite_time_sec: string
aof_last_write_status: string
aof_rewrite_in_progress: string
aof_rewrite_scheduled: string
aof_rewrites: string
aof_rewrites_consecutive_failures: string
arch_bits: string
async_loading: string
atomicvar_api: string
blocked_clients: string
client_recent_max_input_buffer: string
client_recent_max_output_buffer: string
clients_in_timeout_table: string
cluster_connections: string
cluster_enabled: string
config_file: string
configured_hz: string
connected_clients: string
connected_slaves: string
current_active_defrag_time: string
current_cow_peak: string
current_cow_size: string
current_cow_size_age: string
current_eviction_exceeded_time: string
current_fork_perc: string
current_save_keys_processed: string
current_save_keys_total: string
db0: string
dump_payload_sanitizations: string
evicted_clients: string
evicted_keys: string
executable: string
expire_cycle_cpu_milliseconds: string
expired_keys: string
expired_stale_perc: string
expired_time_cap_reached_count: string
gcc_version: string
hz: string
instantaneous_input_kbps: string
instantaneous_input_repl_kbps: string
instantaneous_ops_per_sec: string
instantaneous_output_kbps: string
instantaneous_output_repl_kbps: string
io_threaded_reads_processed: string
io_threaded_writes_processed: string
io_threads_active: string
keyspace_hits: string
keyspace_misses: string
latest_fork_usec: string
lazyfree_pending_objects: string
lazyfreed_objects: string
loading: string
lru_clock: string
master_failover_state: string
master_repl_offset: string
master_replid: string
master_replid2: string
maxclients: string
maxmemory: string
maxmemory_human: string
maxmemory_policy: string
mem_allocator: string
mem_aof_buffer: string
mem_clients_normal: string
mem_clients_slaves: string
mem_cluster_links: string
mem_fragmentation_bytes: string
mem_fragmentation_ratio: string
mem_not_counted_for_evict: string
mem_replication_backlog: string
mem_total_replication_buffers: string
migrate_cached_sockets: string
module_fork_in_progress: string
module_fork_last_cow_size: string
monotonic_clock: string
multiplexing_api: string
number_of_cached_scripts: string
number_of_functions: string
number_of_libraries: string
os: string
process_id: string
process_supervised: string
pubsub_channels: string
pubsub_patterns: string
rdb_bgsave_in_progress: string
rdb_changes_since_last_save: string
rdb_current_bgsave_time_sec: string
rdb_last_bgsave_status: string
rdb_last_bgsave_time_sec: string
rdb_last_cow_size: string
rdb_last_load_keys_expired: string
rdb_last_load_keys_loaded: string
rdb_last_save_time: string
rdb_saves: string
redis_build_id: string
redis_git_dirty: string
redis_git_sha1: string
redis_mode: string
redis_version: string
rejected_connections: string
repl_backlog_active: string
repl_backlog_first_byte_offset: string
repl_backlog_histlen: string
repl_backlog_size: string
reply_buffer_expands: string
reply_buffer_shrinks: string
role: string
rss_overhead_bytes: string
rss_overhead_ratio: string
run_id: string
second_repl_offset: string
server_time_usec: string
slave_expires_tracked_keys: string
sync_full: string
sync_partial_err: string
sync_partial_ok: string
tcp_port: string
total_active_defrag_time: string
total_commands_processed: string
total_connections_received: string
total_error_replies: string
total_eviction_exceeded_time: string
total_forks: string
total_net_input_bytes: string
total_net_output_bytes: string
total_net_repl_input_bytes: string
total_net_repl_output_bytes: string
total_reads_processed: string
total_system_memory: string
total_system_memory_human: string
total_writes_processed: string
tracking_clients: string
tracking_total_items: string
tracking_total_keys: string
tracking_total_prefixes: string
unexpected_error_replies: string
uptime_in_days: string
uptime_in_seconds: string
used_cpu_sys: string
used_cpu_sys_children: string
used_cpu_sys_main_thread: string
used_cpu_user: string
used_cpu_user_children: string
used_cpu_user_main_thread: string
used_memory: string
used_memory_dataset: string
used_memory_dataset_perc: string
used_memory_functions: string
used_memory_human: string
used_memory_lua: string
used_memory_lua_human: string
used_memory_overhead: string
used_memory_peak: string
used_memory_peak_human: string
used_memory_peak_perc: string
used_memory_rss: string
used_memory_rss_human: string
used_memory_scripts: string
used_memory_scripts_eval: string
used_memory_scripts_human: string
used_memory_startup: string
used_memory_vm_eval: string
used_memory_vm_functions: string
used_memory_vm_total: string
used_memory_vm_total_human: string
}

interface Cache {
  commandStats: CommandStats[];
  dbSize: number
  info: Info
}

const cache = ref({} as Cache);
let commandstats: HTMLElement;
let usedmemory: HTMLElement;
// const usedmemory = ref(null);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

function getList() {
  proxy?.$modal.loading("正在加载缓存监控数据，请稍候！");
  getCache().then(response => {
    proxy?.$modal.closeLoading();
    cache.value = response.data;
    const commandstatsIntance = echarts.init(commandstats , "macarons");
    commandstatsIntance.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      series: [
        {
          name: "命令",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: response.data.commandStats,
          animationEasing: "cubicInOut",
          animationDuration: 1000
        }
      ]
    });

    const usedmemoryInstance = echarts.init(usedmemory, "macarons");
    usedmemoryInstance.setOption({
      tooltip: {
        formatter: "{b} <br/>{a} : " + cache.value.info.used_memory_human
      },
      series: [
        {
          name: "峰值",
          type: "gauge",
          min: 0,
          max: 1000,
          detail: {
            formatter: cache.value.info.used_memory_human
          },
          data: [
            {
              value: parseFloat(cache.value.info.used_memory_human),
              name: "内存消耗"
            }
          ]
        }
      ]
    })
  })
}

getList();
</script>
